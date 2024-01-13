const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  prefix: { type: String, required: true },
  number: { type: Number, default: 1 },
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = Sequence;
