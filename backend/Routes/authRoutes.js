import express from "express";
import {
  signup,
  login,
  loginSpecificUser,
  verifyEmailOnSignup,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyemail", verifyEmailOnSignup);
router.post("/login", login);
router.post("/login/:id", loginSpecificUser);

export default router;
