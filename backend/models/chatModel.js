const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  coach: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: 'coach',
},
  provincial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 'provincialCoach',
  },
  national: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 'nationalCoach',
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
