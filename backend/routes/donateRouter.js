const express = require("express");
const { donate } = require("../controllers/donationControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const router = express.Router();

// Donation route
router.post("/", limiter, donate);

module.exports = router;
