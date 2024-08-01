// models/ProvinceFund.js
const mongoose = require("mongoose");

const provinceFundSchema = new mongoose.Schema({
  country: { type: String, required: true },
  province: { type: String, required: true },
  fund: { type: Number, default: 0 },
});

module.exports = mongoose.model("ProvinceFund", provinceFundSchema);
