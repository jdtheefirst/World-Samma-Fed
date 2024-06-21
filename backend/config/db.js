require("dotenv").config({ path: "../secrets.env" });
const mongoose = require("mongoose"); 
const pollModel = require("../models/pollModel");

const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  try {
    const connect = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const seedPoll = async () => {
      const poll = new pollModel({
        question: "From which year would you prefer that Samma Pigano (three ranges of man-to-man combat) becomes a full Olympic Sport?",
        options: [
          { option: '2024' },
          { option: '2028' },
          { option: '2032' },
          { option: 'I have no idea' },
        ],
      });

      await poll.save();
      console.log('Poll seeded!');
    };

    // Call seedPoll function to seed the poll data
    await seedPoll();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Correct exit code
  }
};

module.exports = connectDB;
