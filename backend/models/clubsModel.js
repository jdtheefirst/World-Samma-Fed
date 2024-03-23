const mongoose = require("mongoose");

const clubsModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chairman: {
      type: String,
    },

    secretary: {
      type: String,
    },
    viceChairman: {
      type: String,
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
    membersRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: { type: String },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    registered: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

const Club = mongoose.model("Club", clubsModel);

module.exports = Club;
