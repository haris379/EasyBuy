import User from "../model/User.js";
import Counter from "../model/Counter.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationCode, sendWelcomeEmail } from "../middleware/Email.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Input All Fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      isVerified: false,
      verificationCode,
      verificationCodeExpires,
    });

    await Counter.insertMany([
      { value: 0, user: user._id, name: user.name, email: user.email },
      { value: 0, user: user._id, name: user.name, email: user.email },
      { value: 0, user: user._id, name: user.name, email: user.email },
      { value: 0, user: user._id, name: user.name, email: user.email },
    ]);

    await sendVerificationCode(user.email, verificationCode);
    await user.save();
    res.status(200).json({
      message: "User registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Signup", error });
  }
};
// VerifyEmail on Signup
export const verifyEmailOnSignup = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Please Enter code" });
    }

    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({ message: "Incorrect Code" });
    }

    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification Code expired",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRE_KEY, {
      expiresIn: "5h",
    });
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    sendWelcomeEmail(user.email, user.name);
    await user.save();
    res.status(200).json({
      message: "Email verified Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Verifiaction Failed", error });
  }
};

// VerifyEmail
export const reSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please Enter email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "You dont have account." });
    }
    if (user.isVerified === true) {
      return res
        .status(403)
        .json({ message: "Your account is already verified." });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;

    await sendVerificationCode(user.email, verificationCode);
    await user.save();
    res
      .status(200)
      .json({ message: "Verification code has been sent to your email" });
  } catch (error) {}
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Input All Fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dont have an account" });
    }

    if (user.isVerified === false) {
      return res.status(400).json({ message: "Your email is not verified" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRE_KEY, {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error Login", error });
  }
};

// LoginwithID
export const loginSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ _id: id });
    if (!password) {
      return res.status(400).json({ message: "Enter Password" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRE_KEY, {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error Login with ID", error });
  }
};
