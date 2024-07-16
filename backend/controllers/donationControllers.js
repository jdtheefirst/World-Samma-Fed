const CountryFund = require("../models/donateNational");
const ProvinceFund = require("../models/donateProvince");

const donate = async (req, res) => {
  const { country, province, amount } = req.body;

  try {
    // Update the national fund with 15% of the donation amount
    await CountryFund.findOneAndUpdate(
      { country },
      { $inc: { fund: amount * 0.15 } },
      { upsert: true }
    );

    // If province is provided, update the provincial fund with 5% of the donation amount
    if (province) {
      await ProvinceFund.findOneAndUpdate(
        { country, province },
        { $inc: { fund: amount * 0.05 } },
        { upsert: true }
      );
    } else {
      // If no province, add the 5% to the national fund
      await CountryFund.findOneAndUpdate(
        { country },
        { $inc: { fund: amount * 0.05 } },
        { upsert: true }
      );
    }

    res.status(200).json({ message: "Donation successful" });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ error: "Donation failed" });
  }
};

const getProvinceFund = async (req, res) => {
  const country = req.user.selectedCountry;
  const province = req.user.provinces;

  try {
    const fund = await ProvinceFund.find({
      country: country,
      province: province,
    });
    res.status(200).json(fund);
  } catch (error) {
    console.error("Error fetching province fund:", error);
    res.status(500).json({ error: "Donation fetching failed" });
  }
};

const getNationalFund = async (req, res) => {
  const country = req.user.selectedCountry;

  console.log(country);

  try {
    const fund = await CountryFund.find({ country: country });

    res.status(200).json(fund);
  } catch (error) {
    console.error("Error fetching national fund:", error);
    res.status(500).json({ error: "Donation fetching failed" });
  }
};

module.exports = { donate, getProvinceFund, getNationalFund };
