const { translate } = require("@vitalets/google-translate-api");

const translateText = async (req, res) => {
  const { text, target } = req.query;
  console.log(target);

  try {
    const translation = await translate(text, { to: target });
    res.json(translation.text);
    console.log(translation.text);
  } catch (error) {
    if (error.status === 429) {
      res.status(429).json({ message: "Too many requests" });
    } else {
      res.status(500).json({ error: "Translation failed" });
    }
  }
};

module.exports = { translateText };
