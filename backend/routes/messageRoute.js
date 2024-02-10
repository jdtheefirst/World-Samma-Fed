const express = require("express");
const {
createMessage, allMessages
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");

const router = express.Router();

// router.route("/:chatId").get(protect, limiter, allMessages);
// router.route("/:messageId").delete(protect, limiter, deleteMessage);
router.route("/").post(protect, limiter, createMessage);
router.route("/:userId").get(protect, limiter, allMessages);

module.exports = router;
