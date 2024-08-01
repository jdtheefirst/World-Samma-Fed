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
<<<<<<< HEAD
=======
  allUsers,
  submitAdmissionForm,
>>>>>>> master
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { limiter } = require("../middleware/limiter");
const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.post("/", limiter, registerUsers);
router.get("/searchuser/:email", limiter, searchUser);
router.get("/accountrecovery/:email", limiter, forgotEmail);
router.post("/emailrecovery/:email", limiter, recoverEmail);
router.route("/login").post(limiter, authUser);
// router.get("/:userEmail", limiter, authorizeUser);

router.get("/:country/:provience", protect, limiter, getUsers);
=======
router.post("/post", limiter, registerUsers);
router.get("/searchuser/:email", limiter, searchUser);
router.get("/accountrecovery/:email", limiter, forgotEmail);
router.post("/emailrecovery/:email", limiter, recoverEmail);

router.route("/login").post(limiter, authUser);
router.get("/:userEmail", limiter, authorizeUser);
router.get("/:country/:provience", protect, limiter, getUsers);
router.post("/admission", protect, limiter, submitAdmissionForm);
>>>>>>> master
router.get(
  "/:country/:provience/:name/:userId",
  protect,
  limiter,
  clubRequests
);
router.get("/info/:userId", protect, limiter, getInfo);
<<<<<<< HEAD
router.put("/update/:userId", protect, limiter, updateUser);
=======
router.put("/update", protect, limiter, updateUser);
>>>>>>> master
router.delete("/deleteuser/:userId", protect, limiter, deleteUser);
router.delete("/delete-image/:publicId", protect, limiter, deleteImage);
router.get("/getadsninfo/advertisement", protect, limiter, getAdsInfo);
router.get("/certificate/:userId", protect, limiter, certificate);
<<<<<<< HEAD
=======
router.route("/").get(protect, limiter, allUsers);
>>>>>>> master
module.exports = router;
