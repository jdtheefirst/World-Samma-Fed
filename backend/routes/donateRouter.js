const express = require("express");
const {
  donate,
  getNationalFund,
  getProvinceFund,
} = require("../controllers/donationControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const router = express.Router();

// Donation route
router.post("/", limiter, donate);
router.get("/province", protect, limiter, getProvinceFund);
router.get("/national", protect, limiter, getNationalFund);

module.exports = router;
