const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  makeProvincialRequests,
  getCoaches,
  fecthMyProvince,
} = require("../controllers/provinceControllers");

const router = express.Router();

router.route("/:coachId").get(protect, limiter, makeProvincialRequests);
router.route("/get/coaches").get(protect, limiter, getCoaches);
router.route("/my/province").get(protect, limiter, fecthMyProvince);

module.exports = router;
