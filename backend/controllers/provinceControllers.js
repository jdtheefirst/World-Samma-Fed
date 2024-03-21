const { getUserSocket } = require("../config/socketUtils");
const Club = require("../models/clubsModel");
const ProvincialCoach = require("../models/provinceModel");
const User = require("../models/userModel");

const makeProvincialRequests = async (req, res) => {
  const userId = req.user._id;
  const { coachId } = req.params;
  try {
    const myProvince = await ProvincialCoach.findOne({
      provincialCoach: userId,
    });
    if (myProvince) {
      myProvince.requests.push(coachId);
      await myProvince.save().populate("approvals", "name otherName admission");

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
      res.json(myProvince);
    } else {
      const myProvince = await ProvincialCoach.create({
        provincialCoach: userId,
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

module.exports = { makeProvincialRequests, fecthMyProvince, getCoaches };
