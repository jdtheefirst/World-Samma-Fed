const { default: axios } = require("axios");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const { getUserSocket } = require("../config/socketUtils");
const { getIO } = require("../socket");
const { getNextNumber } = require("../config/getNextSequence");

dotenv.config({ path: "./secrets.env" });

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64"
  );
  const base = "https://api-m.paypal.com";
  try {
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    if (!response.ok) {
      throw new Error("Failed to generate access token");
    }
    const jsonData = await response.json();
    return jsonData.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
}

const createOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const accessToken = await generateAccessToken();
    const base = "https://api-m.paypal.com";
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const userLevel = req.user.belt;

    const belts = [
      "Guest",
      "Yellow",
      "Orange",
      "Red",
      "Purple",
      "Green",
      "Blue",
      "Brown",
      "Black",
    ];

    const nextLevelIndex = belts.indexOf(userLevel) + 1;

    if (nextLevelIndex < belts.length) {
      // Check if userId exists in User schema
      let updatedUser = await User.findByIdAndUpdate(
        userId,
        { belt: belts[nextLevelIndex] },
        { new: true }
      );

      // If userId doesn't exist in User schema, check in Admission schema
      if (!updatedUser) {
        updatedUser = await Admission.findByIdAndUpdate(
          userId,
          { belt: belts[nextLevelIndex] },
          { new: true }
        );
      }

      // If user document is found and belt level is updated to "Yellow", update admission number
      if (updatedUser && updatedUser.belt === "Yellow") {
        const admission = await getNextNumber("U", 9);
        updatedUser.admission = admission;
        await updatedUser.save();
      }

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(updatedUser);
    } else {
      return res
        .status(400)
        .json({ message: "User is already at the highest belt level" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const makePaymentMpesa = async (req, res) => {
  const amount = req.query.amount;
  const phoneNumber = req.body.phoneNumber;

  const phone = parseInt(phoneNumber.slice(1));

  const current_time = new Date();
  const year = current_time.getFullYear();
  const month = String(current_time.getMonth() + 1).padStart(2, "0");
  const day = String(current_time.getDate()).padStart(2, "0");
  const hours = String(current_time.getHours()).padStart(2, "0");
  const minutes = String(current_time.getMinutes()).padStart(2, "0");
  const seconds = String(current_time.getSeconds()).padStart(2, "0");

  const Shortcode = "6549717";
  const Passkey =
    "9101847e14f66f93ffdec5faeceb315e8918b0bcf4940443dc64b8acd94fd9dd";
  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const password = Buffer.from(Shortcode + Passkey + timestamp).toString(
    "base64"
  );

  const generateToken = async () => {
    const secret = process.env.CUSTOMER_SECRET;
    const key = process.env.CUSTOMER_KEY;
    const auth = Buffer.from(key + ":" + secret).toString("base64");
    try {
      const response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      const token = await response.data.access_token;

      return token;
    } catch (error) {
      console.log("Token Error generated", error);
    }
  };

  try {
    const token = await generateToken();

    const { data } = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: "6549717",
        Password: `${password}`,
        Timestamp: `${timestamp}`,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: "8863150",
        PhoneNumber: `254${phone}`,
        CallBackURL: `https://worldsamma.org/api/paycheck/callback`,
        AccountReference: "World Samma Federation",
        TransactionDesc: "Subcription",
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.log("My Error", error);
  }
};

const CallBackURL = async (req, res) => {
  const { Body } = req.body;
  const socket = getIO();

  try {
    const userId = req.user._id;
    const subscription = req.user.subscription; // Assuming this is where subscription is stored

    // Check if userId and subscription are both available
    if (!userId || !subscription) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Body.stkCallback.CallbackMetadata) {
      const nothing = "payment cancelled or insufficient amount";
      io.emit("noPayment", nothing);
      return res.status(400).json({ message: "Invalid callback data" });
    }

    if (Body.stkCallback.CallbackMetadata.Item) {
      const firstItem = Body.stkCallback.CallbackMetadata.Item[0];
      const amount = firstItem.Value;

      if (amount === 500) {
        io.emit("manualRegister");
        return res
          .status(201)
          .json({ message: "Manual register event emitted" });
      }
    }

    // Check if userId exists in User schema
    let userInfo = await User.findById(userId);

    // If userId doesn't exist in User schema, check in Admission schema
    if (!userInfo) {
      userInfo = await Admission.findById(userId);
    }

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLevel = userInfo.belt;
    const belts = [
      "Guest",
      "Yellow",
      "Orange",
      "Red",
      "Purple",
      "Green",
      "Blue",
      "Brown",
      "Black",
    ];

    const nextLevelIndex = belts.indexOf(userLevel) + 1;

    if (nextLevelIndex < belts.length) {
      const updatedBeltLevel = belts[nextLevelIndex];

      // Update user's belt level in the corresponding schema
      const updatedUser = await (userInfo instanceof User
        ? User
        : Admission
      ).findByIdAndUpdate(userId, { belt: updatedBeltLevel }, { new: true });

      const recipientSocketId = getUserSocket(userId);
      if (recipientSocketId) {
        socket.to(recipientSocketId).emit("userUpdated", updatedUser);
        console.log(`Broadcast sent to ${userId}`);
      } else {
        console.log(`Member ${userId} not connected`);
      }

      return res.status(200).json({
        message: "User belt level updated successfully",
        userInfo: updatedUser,
      });
    } else {
      return res
        .status(400)
        .json({ message: "User is already at the highest belt level" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  updateUser,
  makePaymentMpesa,
  CallBackURL,
};
