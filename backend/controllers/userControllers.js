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
const Admission = require("../models/AdmissionModel");

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
    !language ||
    !passport
  ) {
    res.status(400);
    throw new Error({ message: "Please enter all fields!" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists, login");
    }
    const adminId = "6693a995f6295b8bd90d9301";
    const WSF = await User.findOne({ _id: adminId });
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
  } catch (error) {
    console.log(error);
    res.status(500);
    
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { admission: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const userInfo = await User.find({ ...keyword, _id: { $ne: req.user._id } });
  const admissionInfo = await Admission.find({
    ...keyword,
    _id: { $ne: req.user._id },
  });

  // Merge results from userInfo and admissionInfo into a single array
  const allUsers = [...userInfo, ...admissionInfo];

  res.send(allUsers);
});

const forgotEmail = async (req, res) => {
  const { email } = req.params;
  let userInfo = await User.findOne({ email });
  let admissionInfo = await Admission.findOne({ email });

  userInfo = userInfo || admissionInfo;
  if (userInfo) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465, // or 587 if using STARTTLS
      secure: true, // if using SSL/TLS
      auth: {
        user: privateEmail, // your email address
        pass: privateEmailPass, // your email password
      },
    });
    const companyLogoUrl = 'https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720864475/icon.jpg';

    const mailOptions = {
      from: `World Samma Federation <${privateEmail}>`,
      to: email,
      subject: "Recover Your Email",
      html: `
        <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Recover Your Email</h2>
          <img src="${companyLogoUrl}" loading="eager" alt="Company Logo" style="width: 100px; margin-bottom: 20px;">
          <p>Hello,</p>
          <p>You have requested to recover your email associated with our service.</p>
          <p>Your recovery code is: <strong>${verificationCode}</strong></p>
          <p>If you did not request this change, please contact support immediately.</p>
          <p>Stay connected and follow us on social media:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><a href="https://www.tiktok.com/@worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Tiktok</a></li>
            <li style="margin-bottom: 10px;"><a href="https://x.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">X</a></li>
            <li style="margin-bottom: 10px;"><a href="https://facebook.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Facebook</a></li>
            <li style="margin-bottom: 10px;"><a href="https://instagram.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Instagram</a></li>
            <li style="margin-bottom: 10px;"><a href="https://www.youtube.com/@worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Youtube</a></li>
          </ul>
          <p>Remember, every great journey begins with a single step. Embrace the challenges and keep pushing forward!</p>
          <p>Thank you for being a part of our community.</p> 
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({ message: "Email Sending Failed" });
        console.log(error);
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

  let userInfo = await User.findOne({ email });
  let admissionInfo = await Admission.findOne({ email });

  userInfo = userInfo || admissionInfo;

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
  let userInfo = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );
  let admissionInfo = await Admission.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );

  if (!userInfo && !admissionInfo) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  userInfo = userInfo || admissionInfo;

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
    let userInfo = await User.findOne({ email: email });
    let admissionInfo = await Admission.findOne({ admission: email });

    if (!userInfo && !admissionInfo) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    userInfo = userInfo || admissionInfo;

    if (await userInfo.comparePassword(password)) {
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
    }
  } catch (error) {
    console.log("We have an error", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await User.findById(userId);

    res.json({ userInfo, token: generateToken(userInfo._id) });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve possible update" });
  }
};

const getUsers = async (req, res) => {
  const { country, provience } = req.params;

  if (!country || !provience) {
    return;
  }

  try {
    const [userInfo, admissionInfo] = await Promise.all([
      User.find({
        selectedCountry: country,
        provinces: provience,
        $and: [{ coach: null }, { physicalCoach: null }],
      }),
      Admission.find({
        selectedCountry: country,
        provinces: provience,
        $and: [{ coach: null }, { physicalCoach: null }],
      }),
    ]);

    const allInfo = [...userInfo, ...admissionInfo];

    res.json(allInfo);
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
      user: privateEmail,
      pass: privateEmailPass,
    },
  });
  const companyLogoUrl = 'https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720864475/icon.jpg';

  const mailOptions = {
    from: `World Samma Federation <${privateEmail}>`,
    to: userEmail,
    subject: "Verify Your Email",
    html: `
      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <img src="${companyLogoUrl}" loading="eager" alt="Company Logo" style="width: 100px; margin-bottom: 20px;">
        <p>Hello,</p>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This is a system-generated code, please do not reply.</p>
        <p>Join the World Samma Federation and be part of a vibrant community!</p>
        <p>Stay connected and follow us on social media:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 10px;"><a href="https://x.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">X</a></li>
          <li style="margin-bottom: 10px;"><a href="https://www.tiktok.com/@worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Tiktok</a></li>
          <li style="margin-bottom: 10px;"><a href="https://facebook.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Facebook</a></li>
          <li style="margin-bottom: 10px;"><a href="https://instagram.com/worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Instagram</a></li>
          <li style="margin-bottom: 10px;"><a href="https://www.youtube.com/@worldsamma" target="_blank" style="color: #007bff; text-decoration: none;">Youtube</a></li>
        </ul>
        <p>Remember, every great journey begins with a single step. Embrace the challenges and keep pushing forward!</p>
        <p>Thank you for being a part of our community.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({ message: "Email Sending Failed" });
      console.log("This is the error", error);
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

  try {
    let club = await Club.findOne({ coach: loggedUser });

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
    } else {
      club.clubRequests.push(userId);
      await club.save();
    }

    let userInfo = await User.findOne({ email: email });
    let admissionInfo = await Admission.findOne({ admission: email });

    if (!userInfo && !admissionInfo) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    userInfo = userInfo || admissionInfo;
    if (userInfo) {
      userInfo.clubRequests.push(club._id);
      await userInfo.save();
    }

    const populatedClub = await Club.findById(club._id).populate("members");

    const recipientSocketId = getUserSocket(userId);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("sent request", club);
    } else {
      console.log("Recipient not connected");
    }

    res.json(populatedClub);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const certificate = async (req, res) => {
  const { userId } = req.params;
  const { sendCertificate } = req.body;
  const socket = getIO();
  try {
    let userInfo = await User.findOne({ email: email });
    let admissionInfo = await Admission.findOne({ admission: email });

    if (!userInfo && !admissionInfo) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    userInfo = userInfo || admissionInfo;
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
const submitAdmissionForm = async (req, res) => {
  const userId = req.user._id;
  const {
    name,
    otherName,
    id,
    phoneNumber,
    email,
    selectedCountry,
    provinces,
    language,
  } = req.body;

  try {
    if (!name || !otherName) {
      throw new Error({ message: "First name and last name are required." });
    }
    const admCode = await getNextNumber("U", 9);

    const admission = new Admission({
      name,
      otherName,
      id,
      phoneNumber,
      email,
      selectedCountry,
      provinces,
      language,
      admission: admCode,
      registrar: userId,
    });

    await admission.save();

    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  submitAdmissionForm,
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
