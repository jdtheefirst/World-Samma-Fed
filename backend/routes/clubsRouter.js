const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const {
  registerClubs,
  fetchClubs,
  fetchMyClub,
  followClub,
  likeClub,
} = require("../controllers/clubsController");

const router = express.Router();

router.route("/").post(protect, limiter, registerClubs);
router.route("/:country/:provience").get(protect, limiter, fetchClubs);
router.route("/:clubId").get(protect, limiter, fetchMyClub);
router.route("/follow/:clubId/:userId").get(protect, limiter, followClub);
router.route("/likes/:clubId/:userId").get(protect, limiter, likeClub);

module.exports = router;
