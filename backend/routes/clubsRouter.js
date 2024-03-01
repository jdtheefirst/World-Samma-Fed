const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  registerClubs,
  fetchClubs,
  fetchMyClub,
  followClub,
  likeClub,
  broadcast,
  createBroadcast,
} = require("../controllers/clubsController");

const router = express.Router();

router.route("/").post(protect, limiter, registerClubs);
router.route("/:country/:provience").get(protect, limiter, fetchClubs);
router.route("/:clubId").get(protect, limiter, fetchMyClub);
router.route("/follow/:clubId/:userId").get(protect, limiter, followClub);
router.route("/likes/:clubId/:userId").get(protect, limiter, likeClub);
router.route("/broadcast/:clubId/:coachId").get(protect, limiter, broadcast);
router
  .route("/message/:clubId/:coachId")
  .get(protect, limiter, createBroadcast);

module.exports = router;
