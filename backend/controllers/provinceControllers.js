const { getUserSocket } = require("../config/socketUtils");
const Club = require("../models/clubsModel");
const ProvincialCoach = require("../models/provinceModel");
const User = require("../models/userModel");
const { getIO } = require("../socket");

const makeProvincialRequests = async (req, res) => {
  const userId = req.user._id;
  const { coachId } = req.params;
  const { country, province } = req.body;
  const socket = getIO();
  try {
    let existingProvince = await ProvincialCoach.findOne({
      provincialCoach: userId,
    });

    if (existingProvince) {
      existingProvince.requests.push(coachId);
      await existingProvince.save();

      // Check if coachId exists in User collection
      const userExists = await User.exists({ _id: coachId });

      // Update provinceRequests based on the existence of coachId in User or Admission collection
      if (userExists) {
        await User.findByIdAndUpdate(coachId, {
          $push: { provinceRequests: existingProvince._id },
        });
      } else {
        await Admission.findByIdAndUpdate(coachId, {
          $push: { provinceRequests: existingProvince._id },
        });
      }

      const recipientSocketId = getUserSocket(coachId);
      if (recipientSocketId) {
        socket
          .to(recipientSocketId)
          .emit("provincial request", existingProvince);
        console.log(`Broadcast sent to ${coachId}`);
      } else {
        console.log(`Member ${coachId} not connected`);
      }

      res.json(
        existingProvince.populate("approvals", "name otherName admission")
      );
    } else {
      const newProvince = await ProvincialCoach.create({
        provincialCoach: userId,
        country: country,
        province: province,
        requests: [coachId],
      });

      res.json(newProvince.populate("approvals", "name otherName admission"));
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

const fecthMyProvince = async (req, res) => {
  const userId = req.user._id;

  try {
    const myProvince = await ProvincialCoach.findOne({
      provincialCoach: userId,
    })
      .populate("approvals")
      .populate("provincialCoach");
    res.json(myProvince);
  } catch (error) {
    console.log(error);
  }
};
const getCoaches = async (req, res) => {
  const province = req.user.provinces;
  const country = req.user.selectedCountry;

  try {
    const coaches = await Club.find({ provience: province, country: country })
      .select("coach")
      .populate("coach", "name otherName admission");
    res.json(coaches);
  } catch (error) {
    console.error("Error fetching coaches:", error);
    res.status(500).json({ error: "Failed to fetch coaches" });
  }
};
const acceptDecline = async (req, res) => {
  const userId = req.user._id;
  const accept = req.query.accept;
  const provinceId = req.params.provinceId;

  try {
    let user = await User.findById(userId);
    let admissionInfo = await Admission.findById(userId);

    if (!userInfo && !admissionInfo) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    user = user || admissionInfo;

    if (user && user.provinceRequests.includes(provinceId)) {
      user.provinceRequests = user.provinceRequests.filter(
        (request) => !request.equals(provinceId)
      );
      await user.save();

      const province = await ProvincialCoach.findById(provinceId);

      if (province) {
        province.requests.pull(userId);
        if (accept === "true") {
          province.approvals.push(userId);
        }
        await province.save();
        const populatedProvince = await province
          .populate({
            path: "provinceRequests",
            populate: {
              path: "provincialCoach",
              select: "name admission",
            },
          })
          .execPopulate();

        res.json(populatedProvince);
      } else {
        // Return empty array if province is not found
        res.json([]);
      }
    } else {
      res.status(404).json({ error: "User or province not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to accept/decline" });
  }
};

const registerProvince = async (req, res) => {
  const { chairperson, secretary, viceChair } = req.body;
  const userId = req.user._id;
  try {
    const Province = await ProvincialCoach.findOneAndUpdate(
      { provincialCoach: userId },
      {
        chairman: chairperson,
        secretary: secretary,
        viceChairman: viceChair,
        registered: true,
      },
      { new: true }
    );
    res.status(201).json(Province);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register province" });
  }
};

//Get officials registered passed interim
const getProvince = async (req, res) => {
  const { country, province } = req.params;
  try {
    const Province = await ProvincialCoach.find({
      country: country,
      province: province,
      registered: true,
    }).populate({
      path: "provincialCoach",
      select: "name admission belt",
    });

    res.status(201).json(Province);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register province" });
  }
};
module.exports = {
  makeProvincialRequests,
  fecthMyProvince,
  getCoaches,
  acceptDecline,
  registerProvince,
  getProvince,
};
