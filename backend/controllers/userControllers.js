const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Club = require("../models/clubsModel");
const nodemailer = require("nodemailer");

const generateToken = require("../config/generateToken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { getIO } = require("../socket");
const crypto = require("crypto");
const axios = require("axios");
const { DOMParser } = require("@xmldom/xmldom");
const { getUserSocket } = require("../config/socketUtils");
const { getNextNumber } = require("../config/getNextSequence");

dotenv.config({ path: "./secrets.env" });
const privateEmailPass = process.env.privateEmailPass;
const privateEmail = "support@worldsamma.org";

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
    passport,
    language,
  } = req.body;

  if (
    !email ||
    !name ||
    !password ||
    !gender ||
    !selectedCountry ||
    !otherName ||
    !provinces ||
    !language ||
    !passport ||
    !pic
  ) {
    res.status(400);
    throw new Error({ message: "Please enter all fields!" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists, login");
  }
  const WSF = await User.findOne({ admin: true });
  const user = {
    name,
    email,
    password,
    passport,
    language,
    gender,
    pic,
    selectedCountry,
    otherName,
    provinces,
    passport,
    WSF,
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
      wsf: userInfo.WSF,
      language: userInfo.language,
      token: generateToken(userInfo._id),
    };

    res.status(201).json(responseData);
  } else {
    res.status(400);
    throw new Error("Failed to create the account, try again after some time.");
  }
});
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
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
    throw new Error({ message: "Email not Found in the database" });
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
      nationalRequests: userInfo.nationalRequests,
      wsf: userInfo.WSF,
      language: userInfo.language,
      provinceRequests: userInfo.provinceRequests,
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
        nationalRequests: userInfo.nationalRequests,
        wsf: userInfo.WSF,
        language: userInfo.language,
        provinceRequests: userInfo.provinceRequests,
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
        belt: userInfo.belt,
        nationalRequests: userInfo.nationalRequests,
        provinceRequests: userInfo.provinceRequests,
        token: generateToken(userInfo._id),
        wsf: userInfo.WSF,
        language: userInfo.language,
        clubRequests: userInfo.clubRequests,
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });

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
  const { userEmail } = req.params;

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
  let club;

  try {
    club = await Club.findOne({ coach: loggedUser });

    if (!club) {
      const clubCode = await getNextNumber("C", 8);

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
      const populatedClub = await Club.findById(club._id).populate("members");

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

      res.json(populatedClub);
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
      const belts = [
        "Guest",
        "Beginner",
        "Yellow",
        "Orange",
        "Red",
        "Purple",
        "Green",
        "Blue",
        "Brown",
        "Black",
      ];

      const userLevel = belts.indexOf(userInfo.belt);

      if (userLevel !== -1 && userLevel < belts.length - 1) {
        userInfo.belt = belts[userLevel + 1];

        userInfo.certificates.push(sendCertificate);
        await userInfo.save();
      }
    }

    const recipientSocketId = getUserSocket(userId);

    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("certificates", userInfo);
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
  allUsers,
};
