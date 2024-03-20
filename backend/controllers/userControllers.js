const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Club = require("../models/clubsModel");
const Sequence = require("../models/Sequence");
const nodemailer = require("nodemailer");

const generateToken = require("../config/generateToken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { getIO } = require("../socket");
const crypto = require("crypto");
const axios = require("axios");
const { DOMParser } = require("@xmldom/xmldom");
const { getUserSocket } = require("../config/socketUtils");

dotenv.config({ path: "./secrets.env" });
const privateEmailPass = process.env.privateEmailPass;
const privateEmail = "admin@fuckmate.boo";

const registerUsers = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    pic,
    selectedCountry,
    otherName,
    provinces,
  } = req.body;

  if (
    !email ||
    !name ||
    !password ||
    !gender ||
    !selectedCountry ||
    !otherName ||
    !provinces
  ) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists, login");
  }
  const getNextAdminNumber = async () => {
    const sequence = await Sequence.findOneAndUpdate(
      {},
      { $inc: { number: 1 } },
      { new: true }
    );

    if (!sequence || sequence.number > 999999999) {
      await Sequence.updateOne({}, { number: 1 }, { upsert: true });
    }
    const currentNumber = sequence ? sequence.number : 1;

    const paddedNumber = currentNumber.toString().padStart(9, "0");

    const suffix = generateSuffix((currentNumber - 1) % 702);

    const adminNumber = `${paddedNumber}${suffix}`;

    return adminNumber;
  };

  const generateSuffix = (index) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = letters.length;

    let suffix = "";
    while (index >= 0) {
      suffix = letters[index % base] + suffix;
      index = Math.floor(index / base) - 1;
    }

    return suffix;
  };

  const admission = await getNextAdminNumber("U");
  const user = {
    name,
    email,
    password,
    gender,
    pic,
    admission,
    selectedCountry,
    otherName,
    provinces,
  };

  const userInfo = await User.create(user);

  if (userInfo) {
    const responseData = {
      _id: userInfo._id,
      name: userInfo.name,
      otherName: userInfo.otherName,
      admission: userInfo.admission,
      email: userInfo.email,
      gender: userInfo.gender,
      country: userInfo.selectedCountry,
      provinces: userInfo.provinces,
      pic: userInfo.pic,
      belt: userInfo.belt,
      physicalCoach: userInfo.physicalCoach,
      coach: userInfo.coach,
      certificates: userInfo.certificates,
      clubRequests: userInfo.clubRequests,
      token: generateToken(userInfo._id),
    };

    res.status(201).json(responseData);
  } else {
    res.status(400);
    throw new Error("Failed to create the account, try again after some time.");
  }
});
const forgotEmail = async (req, res) => {
  const { email } = req.params;

  const userInfo = await User.findOne({ email });
  if (userInfo) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        userInfo: privateEmail,
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

  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    res.status(201).json("Unfound");
  } else {
    const responseData = {
      _id: userInfo._id,
      admission: userInfo.admission,
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      country: userInfo.selectedCountry,
      provinces: userInfo.provinces,
      pic: userInfo.pic,
      token: generateToken(userInfo._id),
      belt: userInfo.belt,
      physicalCoach: userInfo.physicalCoach,
      coach: userInfo.coach,
      certificates: userInfo.certificates,
      clubRequests: userInfo.clubRequests,
    };
    res.status(201).json(responseData);
  }
};
const recoverEmail = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userInfo = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );
  try {
    if (userInfo) {
      const responseData = {
        _id: userInfo._id,
        admission: userInfo.admission,
        name: userInfo.name,
        email: userInfo.email,
        gender: userInfo.gender,
        pic: userInfo.pic,
        country: userInfo.selectedCountry,
        provinces: userInfo.provinces,
        token: generateToken(userInfo._id),
        belt: userInfo.belt,
        physicalCoach: userInfo.physicalCoach,
        coach: userInfo.coach,
        certificates: userInfo.certificates,
        clubRequests: userInfo.clubRequests,
      };
      res.status(201).json(responseData);
    }
  } catch (error) {
    throw new Error(error, "this is recover email error");
  }
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const userInfo = await User.findOne({ email });

    if (userInfo && (await userInfo.comparePassword(password))) {
      res.json({
        _id: userInfo._id,
        admission: userInfo.admission,
        name: userInfo.name,
        email: userInfo.email,
        gender: userInfo.gender,
        country: userInfo.selectedCountry,
        provinces: userInfo.provinces,
        physicalCoach: userInfo.physicalCoach,
        coach: userInfo.coach,
        certificates: userInfo.certificates,
        pic: userInfo.pic,
        token: generateToken(userInfo._id),
        clubRequests: userInfo.clubRequests,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    console.log(error);
  }
});

const getInfo = async (req, res) => {
  console.log("getuserinfo route");

  const { userId } = req.params;

  console.log("getuserinfo route");

  try {
    const userInfo = await User.findById(userId);

    res.json({ userInfo, token: generateToken(userInfo._id) });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve possible update" });
  }
};

const getUsers = async (req, res) => {
  console.log("Route reached");
  const { country, provience } = req.params;

  if (!country || !provience) {
    return;
  }

  try {
    const allUsers = await User.find({
      selectedCountry: country,
      provinces: provience,
      $and: [{ coach: null }, { physicalCoach: null }],
    });

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    throw new Error("Failed to update userInfo pic");
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
    console.error("Error deleting userInfo:", error);
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
  console.log("Did we just access this route?");
  const { userEmail } = req.params;

  console.log(userEmail);

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      userInfo: privateEmail,
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
  const userAgent = req.headers["userInfo-agent"] || "Unknown";

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
const clubRequests = async (req, res) => {
  const { country, provience, name, userId } = req.params;
  const socket = getIO();

  const loggedUser = req.user._id;
  const getNextClubNumber = async (prefix, initialSequence = 1) => {
    const sequence = await Sequence.findOneAndUpdate(
      { prefix },
      { $inc: { number: 1 } },
      { new: true }
    );

    if (!sequence || sequence.number > 9999999) {
      await Sequence.updateOne(
        { prefix },
        { number: initialSequence },
        { upsert: true }
      );
    }

    const currentNumber = sequence ? sequence.number : initialSequence;

    const paddedNumber = currentNumber.toString().padStart(8, "0");

    const suffix = generateSuffix((currentNumber - 1) % 702);

    const clubNumber = `${prefix}${paddedNumber}${suffix}`;

    return clubNumber;
  };

  const generateSuffix = (index) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = letters.length;

    let suffix = "";
    while (index >= 0) {
      suffix = letters[index % base] + suffix;
      index = Math.floor(index / base) - 1;
    }

    return suffix;
  };

  let club;

  try {
    club = await Club.findOne({ coach: loggedUser });

    if (!club) {
      const clubCode = await getNextClubNumber("C");

      club = await Club.create({
        name: name,
        coach: loggedUser,
        code: clubCode,
        members: loggedUser,
        country: country,
        provience: provience,
        clubRequests: userId,
      });

      const userInfo = await User.findById(userId);
      if (userInfo) {
        userInfo.clubRequests.push(club._id);
        await userInfo.save();
      }
      const recipientSocketId = getUserSocket(userId);

      if (recipientSocketId) {
        socket.to(recipientSocketId).emit("sent request", club);
      } else {
        console.log("Recipient not connected");
      }

      res.json(club);
    } else {
      club.clubRequests.push(userId);
      await club.save();

      const userInfo = await User.findById(userId);
      if (userInfo) {
        userInfo.clubRequests.push(club._id);
        await userInfo.save();
      }

      const recipientSocketId = getUserSocket(userId);

      if (recipientSocketId) {
        socket.to(recipientSocketId).emit("sent request", club);
      } else {
        console.log("Recipient not connected");
      }

      res.json(club);
    }
  } catch (error) {
    console.log(error);
  }
};
const certificate = async (req, res) => {
  const { userId } = req.params;
  const { sendCertificate } = req.body;
  const socket = getIO();
  try {
    const userInfo = await User.findById(userId);
    if (userInfo) {
      userInfo.certificates.push(sendCertificate);
      await userInfo.save();
    }

    const recipientSocketId = getUserSocket(userId);

    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("certificates", userInfo.certificates);
    } else {
      console.log("Recipient not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authorizeUser,
  registerUsers,
  forgotEmail,
  recoverEmail,
  searchUser,
  authUser,
  getInfo,
  getUsers,
  updateUser,
  deleteUser,
  deleteImage,
  getAdsInfo,
  clubRequests,
  certificate,
};
