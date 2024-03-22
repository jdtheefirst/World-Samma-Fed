const { getUserSocket } = require("../config/socketUtils");
const Club = require("../models/clubsModel");
const ProvincialCoach = require("../models/provinceModel");
const User = require("../models/userModel");

const makeProvincialRequests = async (req, res) => {
  const userId = req.user._id;
  const { coachId } = req.params;
  const { country, province } = req.body;
  try {
    const myProvince = await ProvincialCoach.findOne({
      provincialCoach: userId,
    });
    if (myProvince) {
      myProvince.requests.push(coachId);
      await myProvince.save();
      const populatedProvince = await myProvince.populate(
        "approvals",
        "name otherName admission"
      );
      await User.findByIdAndUpdate(coachId, {
        $push: { provinceRequests: myProvince._id },
      });
      const recipientSocketId = getUserSocket(coachId);

      if (recipientSocketId) {
        const populatedProvince = await myProvince
          .populate("provincialCoach")
          .execPopulate();
        socket
          .to(recipientSocketId)
          .emit("provincial request", populatedProvince);
        console.log(`Broadcast sent to ${coachId}`);
      } else {
        console.log(`Member ${coachId} not connected`);
      }
      res.json(populatedProvince);
    } else {
      const myProvince = await ProvincialCoach.create({
        provincialCoach: userId,
        country: country,
        province: province,
        requests: [coachId],
      }).populate("approvals", "name otherName admission");
      res.json(myProvince);
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

  try {
    const coaches = await Club.find({ provience: province })
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
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists and if provinceId exists in provinceRequests
    if (
      user &&
      user.provinceRequests.some((request) =>
        request.provinceId.equals(provinceId)
      )
    ) {
      // Remove provinceId from provinceRequests
      user.provinceRequests = user.provinceRequests.filter(
        (request) => !request.provinceId.equals(provinceId)
      );
      await user.save();

      // Find the provincial coach by ID
      const province = await ProvincialCoach.findById(provinceId);

      // Update the provincial coach based on accept value
      if (province) {
        province.requests.pull(userId);
        if (accept === "true") {
          province.approvals.push(userId);
        }
        await province.save();
      }

      // Populate the provinceRequests field in the provincial coach and send the response
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
const getProvince = async (req, res) => {
  const { country, province } = req.params;
  console.log(country, province);
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
