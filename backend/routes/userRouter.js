const dotenv = require("dotenv");
dotenv.config({ path: "../secrets.env" });
const {
  registerUsers,
  forgotEmail,
  searchUser,
  authUser,
  getUserById,
  getUsers,
  block,
  Unblock,
  updateUser,
  deleteUser,
  deleteImage,
  authorizeUser,
  recoverEmail,
  getAdsInfo,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const id = process.env.idURL;
const express = require("express");
const router = express.Router();

router.post("/", limiter, registerUsers);
router.get("/searchuser/:email", limiter, searchUser);
router.get("/accountrecovery/:email", limiter, forgotEmail);
router.post("/emailrecovery/:email", limiter, recoverEmail);
router.route("/login").post(limiter, authUser);
router.get("/:userEmail", limiter, authorizeUser);

router.get("/female/users", protect, limiter, getUsers);
router.put("/block/:userId", protect, limiter, block);
router.put("/unblock/:userId", protect, limiter, Unblock);
router.get("/getuserid/:userId", protect, getUserById);
router.put("/update/:userId", protect, limiter, updateUser);
router.delete("/deleteuser/:userId", protect, limiter, deleteUser);
router.delete("/delete-image/:publicId", protect, limiter, deleteImage);
router.get("/getadsninfo/advertisement", protect, limiter, getAdsInfo);
module.exports = router;
