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
  acceptRequest,
  joinClub,
  fetchRequests,
  declineRequests,
} = require("../controllers/clubsController");

const router = express.Router();

router.route("/register").post(protect, limiter, registerClubs);
router.route("/:country/:provience").get(protect, limiter, fetchClubs);
router.route("/:clubId").get(protect, limiter, fetchMyClub);
router.route("/follow/:clubId/:userId").get(protect, limiter, followClub);
router.route("/likes/:clubId/:userId").get(protect, limiter, likeClub);
router.route("/broadcast/:clubId/:coachId").get(protect, limiter, broadcast);
router.route("/accept/:clubId/:memberId").get(protect, limiter, acceptRequest);
router.route("/join/:clubId/:userId").get(protect, limiter, joinClub);
router.route("/github/something/:userId").get(protect, limiter, fetchRequests);
router
  .route("/decline/request/:clubId/:userId")
  .get(protect, limiter, declineRequests);
router
  .route("/message/:clubId/:coachId")
  .post(protect, limiter, createBroadcast);

module.exports = router;
