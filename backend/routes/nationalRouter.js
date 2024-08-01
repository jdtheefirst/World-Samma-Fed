const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  getCoaches,
  fecthMyProvince,
  acceptDecline,
  registerProvince,
  getProvince,
  makeNationalRequests,
  fetchAllClubs,
} = require("../controllers/nationalControllers");

const router = express.Router();

router.route("/:coachId").get(protect, limiter, makeNationalRequests);
router.route("/all/:country").get(protect, limiter, fetchAllClubs);
router.route("/get/coaches").get(protect, limiter, getCoaches);
router.route("/my/province").get(protect, limiter, fecthMyProvince);
router.route("/all/:country").get(protect, limiter, fetchAllClubs);
router
  .route("/accept/decline/:provinceId")
  .get(protect, limiter, acceptDecline);
router.route("/register").post(protect, limiter, registerProvince);
router
  .route("/officials/:country/:province")
  .get(protect, limiter, getProvince);

module.exports = router;
