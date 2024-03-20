const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  makeProvincialRequests,
  getCoaches,
} = require("../controllers/provinceControllers");

const router = express.Router();

router.route("/:coachId").get(protect, limiter, makeProvincialRequests);
router.route("/get/coaches").get(protect, limiter, getCoaches);

module.exports = router;
