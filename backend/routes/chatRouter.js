const express = require("express");
const { createChat } = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");

const router = express.Router();

router.route("/:userId").get(protect, limiter, createChat);

module.exports = router;