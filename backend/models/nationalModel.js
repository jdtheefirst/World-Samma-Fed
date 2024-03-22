const mongoose = require("mongoose");

const nationalSchema = new mongoose.Schema(
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
    country: { type: String, required: true },
    province: { type: String, required: true },
    nationalCoach: {
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

const NationalCoach = mongoose.model("NationalCoach", nationalSchema);

module.exports = NationalCoach;
