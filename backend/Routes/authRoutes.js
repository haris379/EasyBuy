import express from "express";
import {
  signup,
  login,
  loginSpecificUser,
  verifyEmail,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verifyemail", verifyEmail);
router.post("/login", login);
router.post("/login/:id", loginSpecificUser);

export default router;
