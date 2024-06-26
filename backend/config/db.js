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

    console.log('Connected to database');

    const seedPoll = async () => {
      const existingPoll = await pollModel.findOne();
      if (!existingPoll) {
        const poll = new pollModel({
          question: "From which year would you prefer that Samma Pigano (three ranges of man-to-man combat) becomes a full Olympic Sport?",
          options: [
            { option: '(a). 2024' },
            { option: '(b). 2028' },
            { option: '(c). 2032' },
            { option: '(d). I have no idea' },
          ],
        });
        
        await poll.save();
      }
    };

    // Call seedPoll function to seed the poll data if it doesn't already exist
    await seedPoll();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Correct exit code
  }
};

module.exports = connectDB;
