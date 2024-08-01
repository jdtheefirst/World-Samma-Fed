const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  makeProvincialRequests,
  getCoaches,
  fecthMyProvince,
  acceptDecline,
  registerProvince,
  getProvince,
} = require("../controllers/provinceControllers");

const router = express.Router();

router.route("/:coachId").get(protect, limiter, makeProvincialRequests);
router.route("/get/coaches").get(protect, limiter, getCoaches);
router.route("/my/province").get(protect, limiter, fecthMyProvince);
router
  .route("/accept/decline/:provinceId")
  .get(protect, limiter, acceptDecline);
router.route("/register").post(protect, limiter, registerProvince);
router
  .route("/officials/:country/:province")
  .get(protect, limiter, getProvince);

module.exports = router;
