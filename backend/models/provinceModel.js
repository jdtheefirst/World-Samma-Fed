const mongoose = require("mongoose");

const provincialCoachSchema = new mongoose.Schema({
  chairman: {
    type: String,
  },
  secretary: {
    type: String,
  },
  viceChairman: {
    type: String,
  },
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
});

const ProvincialCoach = mongoose.model(
  "ProvincialCoach",
  provincialCoachSchema
);

module.exports = ProvincialCoach;
