const dotenv = require("dotenv");
dotenv.config({ path: "../secrets.env" });
const {
  registerUsers,
  forgotEmail,
  searchUser,
  authUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteImage,
  authorizeUser,
  recoverEmail,
  getAdsInfo,
  clubRequests,
  getInfo,
  certificate,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const express = require("express");
const router = express.Router();

router.post("/", limiter, registerUsers);
router.get("/searchuser/:email", limiter, searchUser);
router.get("/accountrecovery/:email", limiter, forgotEmail);
router.post("/emailrecovery/:email", limiter, recoverEmail);
router.route("/login").post(limiter, authUser);
// router.get("/:userEmail", limiter, authorizeUser);

router.get("/:country/:provience", protect, limiter, getUsers);
router.get(
  "/:country/:provience/:name/:userId",
  protect,
  limiter,
  clubRequests
);
router.get("/info/:userId", protect, limiter, getInfo);
router.put("/update/:userId", protect, limiter, updateUser);
router.delete("/deleteuser/:userId", protect, limiter, deleteUser);
router.delete("/delete-image/:publicId", protect, limiter, deleteImage);
router.get("/getadsninfo/advertisement", protect, limiter, getAdsInfo);
router.get("/certificate/:userId", protect, limiter, certificate);
module.exports = router;
