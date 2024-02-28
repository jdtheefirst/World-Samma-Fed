const mongoose = require("mongoose");

const clubsModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    code: { type: String, required: true, unique: true },
    country: { type: String },
    provience: { type: String },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    clubRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: { type: Number },
    likes: { type: Number },
    registered: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

const Club = mongoose.model("Club", clubsModel);

module.exports = Club;
