const { default: axios } = require("axios");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const { getUserSocket } = require("../config/socketUtils");
const { getIO } = require("../socket");

dotenv.config({ path: "./secrets.env" });

let userId;
let subscription;

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString(
    "base64"
  );
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}
const createOrder = async (req, res) => {
  const { amount } = req.body;
  const base = "https://api-m.paypal.com";

  const accessToken = await generateAccessToken();
  const url = `${base.sandbox}/v2/checkout/orders`;
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
  const data = await response.json();
  res.json(data);
};
const updateUser = async (req, res) => {
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

  // Find the index of the next belt level in the array
  const nextLevelIndex = belts.indexOf(userLevel) + 1;

  // Check if the user's current belt level is not already at the highest level
  if (nextLevelIndex < belts.length) {
    // Update the user's belt level
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { belt: belts[nextLevelIndex] },
      { new: true }
    ).select("belt");

    res.json(updatedUser);
  } else {
    // Send a response indicating that the user is already at the highest belt level
    res
      .status(400)
      .json({ message: "User is already at the highest belt level" });
  }
};

const makePaymentMpesa = async (req, res) => {
  userId = req.params.userId;
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
        Amount: 5900,
        PartyA: `254${phone}`,
        PartyB: "8863150",
        PhoneNumber: `254${phone}`,
        CallBackURL: `https://world-samma/api/paycheck/callback`,
        AccountReference: "Worldsamma",
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

  const io = getIO();
  if (!userId && !subscription) {
    return res.status(401);
  }
  if (!Body.stkCallback.CallbackMetadata) {
    const nothing = "payment cancelled or insufficient amount";
    io.emit("noPayment", nothing);
    return res.status(201).json({ message: "Invalid callback data" });
  }
  if (Body.stkCallback.ResultDesc) {
    res.status(201);
  }

  const updatedUser = await User.findById(userId);

  if (updatedUser) {
    const userLevel = updatedUser.belt;
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

    // Find the index of the next belt level in the array
    const nextLevelIndex = belts.indexOf(userLevel) + 1;

    // Check if the user's current belt level is not already at the highest level
    if (nextLevelIndex < belts.length) {
      // Update the user's belt level
      const updated = await User.findByIdAndUpdate(
        userId,
        { belt: belts[nextLevelIndex] },
        { new: true }
      ).select("belt");
      const recipientSocketId = getUserSocket(userId);

      if (recipientSocketId) {
        socket.to(recipientSocketId).emit("userUpdated", updated);
        console.log(`Broadcast sent to ${coachId}`);
      } else {
        console.log(`Member ${coachId} not connected`);
      }
    } else {
      // Send a response indicating that the user is already at the highest belt level
      res
        .status(400)
        .json({ message: "User is already at the highest belt level" });
    }
  }
};

module.exports = {
  createOrder,
  updateUser,
  makePaymentMpesa,
  CallBackURL,
};
