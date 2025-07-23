import crypto from "crypto";
import nodemailer from "nodemailer";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

const resetTokens = {};

// Request password reset
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const token = crypto.randomBytes(32).toString("hex");
  resetTokens[token] = { userId: user._id, expires: Date.now() + 3600000 };

  console.log(`Password reset link: http://localhost:5173/reset-password/${token}`);
  res.json({ message: "Password reset link sent to email (check console in demo)." });
});

// Reset password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const data = resetTokens[token];
  if (!data || data.expires < Date.now()) return res.status(400).json({ message: "Invalid or expired token" });
  const user = await User.findById(data.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.password = password;
  await user.save();
  delete resetTokens[token];
  res.json({ message: "Password reset successful" });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log('User registered:', newUser); 
    res.status(201).json({ user: { _id: newUser._id, fullname, email } });
  } catch (err) {
    console.error('Registration error:', err); 
    res.status(400).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });
    res.json({ user: { _id: user._id, fullname: user.fullname, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
