const Sequence = require("../models/Sequence");
const { Club } = require("../models/clubsModel");


const registerClubs = async (req, res) => {
  const { name, country, province, coach, chair, viceChair, treasurer, members} = req.body;

  if (!name || !country || !province || !coach || !chair || !viceChair || !treasurer || !members) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await Club.findOne({ coach });
  if (userExists) {
    res.status(400);
    throw new Error("You have an active club already");
  }
const getNextAdminNumber = async (prefix, initialSequence = 1) => {
  const sequence = await Sequence.findOneAndUpdate({ prefix }, { $inc: { number: 1 } }, { new: true });

  if (!sequence || sequence.number > 9999999) {
    await Sequence.updateOne({ prefix }, { number: initialSequence }, { upsert: true });
  }

  const currentNumber = sequence ? sequence.number : initialSequence;

  const paddedNumber = currentNumber.toString().padStart(8, "0");

  const suffix = generateSuffix((currentNumber - 1) % 702);

  const adminNumber = `${prefix}${paddedNumber}${suffix}`;

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

 const clubCode = await getNextAdminNumber('C');

  const clubData = {name, country, province, coach, chair, viceChair, treasurer, members, clubCode};

  try {
    
  const club = await Club.create(clubData);

  res.status(201).json(club);
    
  } catch (error) {
    throw new Error("Error occurred", error);
  }
};
const fetchClubs = async (req, res) => {
  const { country, province } = req.params;
  try {
    const clubs = await Club.find({ country, province });

    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {registerClubs, fetchClubs}