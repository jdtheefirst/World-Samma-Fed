require("dotenv").config({ path: "../secrets.env" });
const mongoose = require("mongoose");

const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  console.log(URL);
  try {
    const connect = await mongoose.connect(URL, {

    });
    console.log(`MongoDB connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(404);
  }
};
module.exports = connectDB;
