import express from "express";
import {
  signup,
  login,
  loginSpecificUser,
  verifyEmailOnSignup,
  reSendOtp,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyemail", verifyEmailOnSignup);
router.post("/re-send", reSendOtp);
router.post("/login", login);
router.post("/login/:id", loginSpecificUser);

export default router;
