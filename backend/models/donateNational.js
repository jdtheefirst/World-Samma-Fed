// models/CountryFund.js
const mongoose = require("mongoose");

const countryFundSchema = new mongoose.Schema({
  country: { type: String, required: true },
  fund: { type: Number, default: 0 },
});

module.exports = mongoose.model("CountryFund", countryFundSchema);
