const mongoose = require("mongoose");

const coachBroadcast = mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    content: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Broadcast = mongoose.model("Broadcast", coachBroadcast);

module.exports = Broadcast;
