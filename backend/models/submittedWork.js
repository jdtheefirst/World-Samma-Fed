const mongoose = require("mongoose");

const submittedWork = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    passport: { type: String },
    video: { type: String },
    coachAssisted: { type: Boolean, default: false },
  },
  { versionKey: false },
  { timestamps: true }
);

const Work = mongoose.model("Work", submittedWork);

module.exports = Work;
