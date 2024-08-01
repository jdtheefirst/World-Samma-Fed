const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const { translateText } = require("../controllers/translateText");

const router = express.Router();

router.route("/").get(protect, limiter, translateText);

module.exports = router;
