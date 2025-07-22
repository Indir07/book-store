import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ...existing cart routes...

// Buy cart (simulate purchase)
router.post("/cart/buy", async (req, res) => {
  const email = req.header("x-user-email") || req.body.email || req.query.email;
  if (!email) return res.status(401).json({ message: "No user email provided" });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  // Here you could create an order, send email, etc.
  user.cart = [];
  await user.save();
  res.json({ message: "Purchase successful" });
});

export default router;
