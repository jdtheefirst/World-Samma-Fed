const mongoose = require("mongoose");
const beltSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateEnrolled: { type: Date, default: Date.now },
    dateGraded: { type: Date },
    progress: { type: Number, default: 0 },
    certificateSerial: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// Belt1 model
const Belt = mongoose.model("Belt", beltSchema);
module.exports = Belt;