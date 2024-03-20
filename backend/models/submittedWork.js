const mongoose = require("mongoose");

const submittedWork = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    passport: { type: String, required: true },
    video: { type: String, required: true },
  },
  { versionKey: false },
  { timestamps: true }
);

const Work = mongoose.model("Work", submittedWork);

module.exports = Work;
