const CountryFund = require("../models/donateNational");
const ProvinceFund = require("../models/donateProvince");

const donate = async (req, res) => {
  const { country, province, amount } = req.body;

  try {
    await CountryFund.findOneAndUpdate(
      { country },
      { $inc: { fund: amount * 0.15 } },
      { upsert: true }
    );

    await ProvinceFund.findOneAndUpdate(
      { country, province },
      { $inc: { fund: amount * 0.05 } },
      { upsert: true }
    );

    res.status(200).json({ message: "Donation successful" });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ error: "Donation failed" });
  }
};

module.exports = { donate };
