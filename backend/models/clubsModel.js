const mongoose = require("mongoose");

const clubsModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    code: { type: String, required: true, unique: true},
    country: { type: String },
    province: { type: String },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  { versionKey: false, timestamps: true }
);

const Club = mongoose.model("Club", clubsModel);

module.exports = { Club };
