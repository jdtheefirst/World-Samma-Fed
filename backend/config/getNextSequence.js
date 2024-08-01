const Sequence = require("../models/Sequence");

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

const getNextNumber = async (prefix, length, initialSequence = 1) => {
  const sequence = await Sequence.findOneAndUpdate(
    { prefix },
    { $inc: { number: 1 } },
    { new: true }
  );

  if (!sequence || sequence.number > Math.pow(10, length) - 1) {
    await Sequence.updateOne(
      { prefix },
      { number: initialSequence },
      { upsert: true }
    );
  }

  const currentNumber = sequence ? sequence.number : initialSequence;

  const paddedNumber = currentNumber.toString().padStart(length, "0");
  const suffix = generateSuffix((currentNumber - 1) % 702);

  return `${prefix}${paddedNumber}${suffix}`;
};

module.exports = {
  getNextNumber,
};
