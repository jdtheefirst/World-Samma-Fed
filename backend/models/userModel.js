const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    otherName: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1692259839/xqm81bw94x7h6velrwha.png",
    },
    admission: { type: String },
    selectedCountry: { type: String },
    gender: { type: String },
    provinces: { type: String },
    language: { type: String, required: true },
    passport: { type: String },
    belt: { type: String, default: "Guest" },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: "Club", default: null },
    certificates: { type: Array, default: [] },
    admin: { type: Boolean, default: false },
    WSF: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    physicalCoach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    clubRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    provinceRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProvincialCoach" },
    ],
    nationalRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "NationalCoach" },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
