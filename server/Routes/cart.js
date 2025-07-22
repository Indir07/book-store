import express from "express";
import User from "../models/User.js";
import Book from "../models/book.js";

const router = express.Router();

// Middleware to get user by email (for demo, replace with auth in production)
async function getUser(req, res, next) {
  const email = req.header("x-user-email") || req.body.email || req.query.email;
  if (!email) return res.status(401).json({ message: "No user email provided" });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  req.user = user;
  next();
}

// Get user's cart
router.get("/cart", getUser, async (req, res) => {
  await req.user.populate("cart.book");
  res.json(req.user.cart);
});

// Add book to cart
router.post("/cart/add", getUser, async (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  const cartItem = req.user.cart.find((item) => item.book.equals(bookId));
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    req.user.cart.push({ book: bookId, quantity });
  }
  await req.user.save();
  await req.user.populate("cart.book");
  res.json(req.user.cart);
});

// Remove book from cart
router.post("/cart/remove", getUser, async (req, res) => {
  const { bookId } = req.body;
  req.user.cart = req.user.cart.filter((item) => !item.book.equals(bookId));
  await req.user.save();
  await req.user.populate("cart.book");
  res.json(req.user.cart);
});

// Clear cart
router.post("/cart/clear", getUser, async (req, res) => {
  req.user.cart = [];
  await req.user.save();
  res.json([]);
});

export default router;
