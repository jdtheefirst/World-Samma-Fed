const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const { registerClubs } = require("../controllers/clubsController");

const router = express.Router();

router.route("/").post(protect, limiter, registerClubs);

module.exports = router;
