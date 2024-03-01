const Sequence = require("../models/Sequence");
const Club = require("../models/clubsModel");
const Broadcast = require("../models/coachBroadcast");

const registerClubs = async (req, res) => {
  const {
    name,
    country,
    province,
    coach,
    chair,
    viceChair,
    treasurer,
    members,
  } = req.body;

  if (
    !name ||
    !country ||
    !province ||
    !coach ||
    !chair ||
    !viceChair ||
    !treasurer ||
    !members
  ) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await Club.findOne({ coach });
  if (userExists) {
    res.status(400);
    throw new Error("You have an active club already");
  }
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

  const clubCode = await getNextClubNumber("C");

  const clubData = {
    name,
    country,
    province,
    coach,
    chair,
    viceChair,
    treasurer,
    members,
    clubCode,
  };

  try {
    const club = await Club.create(clubData);

    res.status(201).json(club);
  } catch (error) {
    throw new Error("Error occurred", error);
  }
};
const fetchClubs = async (req, res) => {
  const { country, provience } = req.params;
  console.log(country, provience);
  try {
    const clubs = await Club.find({ country, provience });

    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchMyClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.status(200).json(club);
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

    res.status(200).json(club);
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

    res.status(200).json(club);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: message.error });
  }
};

const broadcast = async (req, res) => {
  const { clubId, coachId } = req.params;
  try {
    const broadcastMessages = await Broadcast.find({
      coach: coachId,
      club: clubId,
    });

    res.status(200).json(broadcastMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerClubs,
  fetchClubs,
  fetchMyClub,
  followClub,
  likeClub,
  broadcast,
};
