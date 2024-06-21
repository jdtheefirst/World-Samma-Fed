
const {
makeVote, fetchVotes
} = require("../controllers/voteControllers");
const { voteLimiter } = require("../middleware/limiter");
const express = require("express");
const router = express.Router();

router.post("/vote", voteLimiter, makeVote);
router.get("/", fetchVotes);
module.exports = router;