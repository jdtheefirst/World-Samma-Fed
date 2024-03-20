const express = require("express");
const {
  submitWork,
  fetchWork,
  deleteImages,
  deleteWork,
} = require("../controllers/submitControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");

const router = express.Router();

router.route("/:userId").post(protect, limiter, submitWork);
router.route("/").get(protect, limiter, fetchWork);
router
  .route("/delete/:submissionId")
  .post(protect, limiter, deleteWork, deleteImages);

module.exports = router;
