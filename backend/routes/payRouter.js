const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  updateUser,
  makePaymentMpesa,
  CallBackURL,
} = require("../controllers/payControllers");
const { limiter } = require("../middleware/limiter");
const express = require("express");
const router = express.Router();

router.post("/create-paypal-order", protect, limiter, createOrder);

router.put("/:userId/:type/:accountType", protect, limiter, updateUser);

router.post("/makepaymentmpesa/:userId", protect, limiter, makePaymentMpesa);
<<<<<<< HEAD
router.post("/callback", limiter, CallBackURL);
=======
router.post("/callback/:userId", limiter, CallBackURL);
>>>>>>> master
module.exports = router;
