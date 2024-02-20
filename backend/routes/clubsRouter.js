const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const { registerClubs, fetchClubs } = require("../controllers/clubsController");

const router = express.Router();

router.route("/").post(protect, limiter, registerClubs);
router.route('/:country/:provience').get(protect, limiter, fetchClubs);

module.exports = router;
