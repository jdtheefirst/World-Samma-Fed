const { getIO } = require("../socket");
const { getUserSocket } = require("../config/socketUtils");
const Club = require("../models/clubsModel");
const Broadcast = require("../models/coachBroadcast");
const User = require("../models/userModel");

const registerClubs = async (req, res) => {
  const { chairperson, secretary, viceChair } = req.body;
  const coachId = req.user._id;

  const clubExists = await Club.findOne({ coach: coachId });
  const clubData = {
    chairman: chairperson,
    viceChairman: viceChair,
    secretary: secretary,
    registered: true,
  };

  try {
    if (clubExists) {
      const club = await Club.findByIdAndUpdate(clubExists._id, clubData);
      const populatedClub = await club
        .populate({ path: "coach" })
        .populate({
          path: "membersRequests",
          select: "name admission",
        })
        .populate({
          path: "members",
          select: "name admission",
        });

      res.status(200).json(populatedClub);
    }
    {
      return res.status(404).json({ error: "Club not found" });
    }
  } catch (error) {
    throw new Error("Error occurred", error);
  }
};

const fetchClubs = async (req, res) => {
  const { country, provience } = req.params;
  try {
    let clubs;
    if (provience) {
      clubs = await Club.find({ country, provience });
    } else {
      clubs = await Club.find({ country, provience: { $exists: false } });
    }
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchMyClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const populatedClub = await Club.findById(clubId)
      .populate({ path: "coach" })
      .populate({
        path: "membersRequests",
        select: "name admission pic",
      })
      .populate({
        path: "members",
        select: "name admission pic",
      });

    if (!populatedClub) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.status(200).json(populatedClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error(`An error occurred: ${error.message}`);
  }
};

const followClub = async (req, res) => {
  const { clubId, userId } = req.params;

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const isFollower = club.followers.find(
      (followerId) => followerId.toString() === userId
    );

    if (isFollower) {
      club.followers = club.followers.filter(
        (followerId) => followerId.toString() !== userId
      );
    } else {
      club.followers.push(userId);
    }

    await club.save();

    const populatedClub = await Club.findById(club._id)
      .populate({ path: "coach" })
      .populate({
        path: "membersRequests",
        select: "name admission",
      })
      .populate({
        path: "members",
        select: "name admission",
      });

    res.status(200).json(populatedClub);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: message.error });
  }
};
const likeClub = async (req, res) => {
  const { clubId, userId } = req.params;

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const likes = club.likes.find((likeId) => likeId.toString() === userId);

    if (likes) {
      club.likes = club.likes.filter((likeId) => likeId.toString() !== userId);
    } else {
      club.likes.push(userId);
    }

    await club.save();

    const populatedClub = await Club.findById(club._id)
      .populate({ path: "coach" })
      .populate({
        path: "membersRequests",
        select: "name admission",
      })
      .populate({
        path: "members",
        select: "name admission",
      });

    res.status(200).json(populatedClub);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: message.error });
  }
};

const broadcast = async (req, res) => {
  const { clubId } = req.params;

  try {
    const broadcastMessages = await Broadcast.find({
      club: clubId,
    });

    res.status(200).json(broadcastMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBroadcast = async (req, res) => {
  const { clubId, coachId } = req.params;
  const { broadcastMessage } = req.body;
  const socket = getIO();

  try {
    const message = new Broadcast({
      coach: coachId,
      club: clubId,
      content: broadcastMessage,
    });

    await message.save();

    const club = await Club.findById(clubId).select("members");

    if (club && club.members && club.members.length > 0) {
      club.members.forEach((memberId) => {
        const recipientSocketId = getUserSocket(memberId);

        if (recipientSocketId) {
          socket.to(recipientSocketId).emit("message received", message);
          console.log(`Broadcast sent to ${memberId}`);
        } else {
          console.log(`Member ${memberId} not connected`);
        }
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error creating broadcast:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const acceptRequest = async (req, res) => {
  const { clubId, memberId } = req.params;
  const socket = getIO();

  try {
    const club = await Club.findById(clubId);

    if (club) {
      club.membersRequests.pull(memberId);
      club.members.push(memberId);

      await club.save();

      const user = await User.findById(memberId);

      if (user) {
        user.clubRequests.pull(clubId);

        user.physicalCoach = club.coach;

        await user.save();

        const recipientSocketId = getUserSocket(memberId);

        if (recipientSocketId) {
          socket.to(recipientSocketId).emit("updates", user.clubRequests);
        } else {
          console.log(`Member not connected`);
        }
      } else {
        return res.status(404).json({ error: "User not found" });
      }
      const populatedClub = await Club.findById(club._id)
        .populate({ path: "coach" })
        .populate({
          path: "membersRequests",
          select: "name admission",
        })
        .populate({
          path: "members",
          select: "name admission",
        });
      return res.status(200).json(populatedClub);
    } else {
      return res.status(404).json({ error: "Club not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const joinClub = async (req, res) => {
  const { clubId, userId } = req.params;

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (!club.membersRequests.includes(userId)) {
      club.membersRequests.push(userId);
      await club.save();
    }
    const populatedClub = await Club.findById(club._id)
      .populate({ path: "coach" })
      .populate({
        path: "membersRequests",
        select: "name admission",
      })
      .populate({
        path: "members",
        select: "name admission",
      });

    res.status(200).json(populatedClub);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const fetchRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await User.findById(userId).populate({
      path: "clubRequests",
      select: "name _id",
    });

    // If user not found in User schema, check in Admission schema
    if (!user) {
      user = await Admission.findById(userId).populate({
        path: "clubRequests",
        select: "name _id",
      });
    }

    if (user) {
      const clubs = user.clubRequests.map((club) => ({
        name: club.name,
        _id: club._id,
      }));

      return res.status(200).json(clubs);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const declineRequests = async (req, res) => {
  const { userId, clubId } = req.params;

  try {
    let user = await User.findById(userId);

    // If user not found in User schema, check in Admission schema
    if (!user) {
      user = await Admission.findById(userId);
    }

    if (user) {
      const clubRequestToRemove = user.clubRequests.find(
        (request) => request.toString() === clubId
      );

      if (clubRequestToRemove) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { clubRequests: clubRequestToRemove._id } },
          { new: true }
        )
          .populate({
            path: "clubRequests",
            select: "name _id",
          })
          .lean();

        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error: "Club request not found" });
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const club = await Club.findByIdAndUpdate(
      clubId,
      { $pull: { clubRequests: userId } },
      { new: true }
    );

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerClubs,
  fetchClubs,
  fetchMyClub,
  followClub,
  likeClub,
  broadcast,
  createBroadcast,
  acceptRequest,
  joinClub,
  fetchRequests,
  declineRequests,
};
