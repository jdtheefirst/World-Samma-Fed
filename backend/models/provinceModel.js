const mongoose = require("mongoose");

const provincialCoachSchema = new mongoose.Schema(
  {
    chairman: {
      type: String,
    },

    secretary: {
      type: String,
    },
    viceChairman: {
      type: String,
    },
    country: { type: String },
    province: { type: String },
    provincialCoach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    approvals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    registered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProvincialCoach = mongoose.model(
  "ProvincialCoach",
  provincialCoachSchema
);

module.exports = ProvincialCoach;
