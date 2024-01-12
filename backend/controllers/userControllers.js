const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Sequence = require("../models/Sequence")
const nodemailer = require("nodemailer");

const generateToken = require("../config/generateToken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");
const axios = require("axios");
const { DOMParser } = require("xmldom");

dotenv.config({ path: "./secrets.env" });
const privateEmailPass = process.env.privateEmailPass;
const privateEmail = "admin@fuckmate.boo";

const registerUsers = asyncHandler(async (req, res) => {
  const { name, email, password, gender, pic, value } = req.body;

  if (!email || !name || !password || !gender) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists, login");
  }
  const getNextAdminNumber = async () => {
  // Assuming you have a Sequence model defined with a 'number' field
  const sequence = await Sequence.findOneAndUpdate({}, { $inc: { number: 1 } }, { new: true });

  // If no sequence exists, create one with an initial number
  if (!sequence) {
    const newSequence = new Sequence({ number: 1 });
    await newSequence.save();
    return "001A";
  }

  // Generate the sequence based on the retrieved number
  const paddedNumber = sequence.number.toString().padStart(3, "0");
  const adminNumber = `${paddedNumber}A`;

  return adminNumber;
};


  const userData = { name, email, password, gender, pic, value };

  const user = await User.create(userData);

  if (user) {
    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      pic: user.pic,
      token: generateToken(user._id),

    };

    res.status(201).json(responseData);
  } else {
    res.status(400);
    throw new Error("Failed to create the account, try again after some time.");
  }
});
const forgotEmail = async (req, res) => {
  const { email } = req.params;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: privateEmail,
        pass: privateEmailPass,
      },
    });
    const mailOptions = {
      from: privateEmail,
      to: email,
      subject: "Recover Your Email",
      text: `Your recovery code is:  ${verificationCode}
    
This is system's generated code, please do not reply.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({ message: "Email Sending Failed" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ verificationCode, email });
      }
    });
  } else {
    res.json(false);
    throw new Error("Email not Found in the database");
  }
};
const searchUser = async (req, res) => {
  const { email } = req.params;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(201).json("Unfound");
  } else {
    const responseData = {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      gender: userExists.gender,
      value: userExists.value,
      pic: userExists.pic,
      isBlocked: userExists.isBlocked,
      token: generateToken(userExists._id),
      accountType: userExists.accountType,
      subscription: userExists.subscription,
      adsSubscription: userExists.adsSubscription,
      day: userExists.day,
    };
    res.status(201).json(responseData);
  }
};
const recoverEmail = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userData = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );
  try {
    if (userData) {
      const responseData = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        value: userData.value,
        pic: userData.pic,
        isBlocked: userData.isBlocked,
        token: generateToken(userData._id),
        accountType: userData.accountType,
        subscription: userData.subscription,
        adsSubscription: userData.adsSubscription,
        day: userData.day,
      };
      res.status(201).json(responseData);
    }
  } catch (error) {
    throw new Error(error, "this is recover email error");
  }
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user.deleted) {
    res.status(401);
    throw new Error("Sign Up please...");
  }

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      value: user.value,
      pic: user.pic,
      isBlocked: user.isBlocked,
      token: generateToken(user._id),
      accountType: user.accountType,
      subscription: user.subscription,
      adsSubscription: user.adsSubscription,
      day: user.day,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $match: { gender: "female", deleted: { $ne: true } } },
      { $sample: { size: 3 } },
    ]);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const block = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = req.user;
  try {
    await User.updateOne(
      { _id: user._id },
      { $addToSet: { isBlocked: userId } }
    );
    const updatedUser = await User.findById(user._id).select("isBlocked");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to Block!" });
  }
});
const Unblock = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = req.user;

  try {
    await User.updateOne({ _id: user._id }, { $pull: { isBlocked: userId } });

    const updatedUser = await User.findById(user._id).select("isBlocked");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Unable to Unblock" });
  }
});
const updateUser = async (req, res) => {
  const { pic } = req.body;
  const { userId } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { pic: pic },
      { new: true }
    ).select("pic");

    res.json(updatedUser);
  } catch (error) {
    throw new Error("Failed to update user pic");
  }
};
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const deletedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: "Deleted Account",
          value: "",
          deleted: true,
          password: "",
          pic: "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1692259839/xqm81bw94x7h6velrwha.png",
          isBlocked: [],
        },
      },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteImage = async (req, res) => {
  const public_id = req.params.publicId;
  const timestamp = new Date().getTime();
  const stringToSign = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign)
    .digest("hex");

  try {
    const formData = new FormData();
    formData.append("public_id", public_id);
    formData.append("signature", signature);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);

    await axios.delete(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      { data: formData }
    );

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the image" });
  }
};
const authorizeUser = async (req, res) => {
  const { userEmail } = req.params;

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: privateEmail,
      pass: privateEmailPass,
    },
  });
  const mailOptions = {
    from: privateEmail,
    to: userEmail,
    subject: "Verify Your Email",
    text: `Your verification code is:  ${verificationCode}
    
This is system's generated code, please do not reply.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({ message: "Email Sending Failed" });
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json(verificationCode);
    }
  });
};
const getAdsInfo = async (req, res) => {
  const acceptLanguage = req.headers["accept-language"] || "en-US";
  const referrer = req.headers.referer || "unknown";
  const userIP = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"] || "Unknown";

  try {
    const response = await fetch(
      `http://1482.digitaldsp.com/api/bid_request?feed=1482&auth=JbYI1mfvqR&ip=${userIP}&ua=${encodeURIComponent(
        userAgent
      )}&lang=${encodeURIComponent(acceptLanguage)}&ref=${encodeURIComponent(
        referrer
      )}&sid=${6644177}`
    );
    if (response.status === 204) {
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");

    res.json(xmlDoc);
  } catch (error) {
    console.error("Error fetching/displaying ads:", error);
  }
};

module.exports = {
  authorizeUser,
  registerUsers,
  forgotEmail,
  recoverEmail,
  searchUser,
  authUser,
  getUserById,
  getUsers,
  block,
  Unblock,
  updateUser,
  deleteUser,
  deleteImage,
  getAdsInfo,
};
