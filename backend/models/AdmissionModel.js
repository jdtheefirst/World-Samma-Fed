const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    id: String,
    phoneNumber: String,
    email: String,
    selectedCountry: String,
    provinces: String,
    language: String,
    belt: { type: String },
    registrar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    admission: String,
  },
  { timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
