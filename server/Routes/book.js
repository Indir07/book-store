import express from "express";
import Book from "../models/book.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/free", async (req, res) => {
  try {
    const books = await Book.find({ price: 0 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/seed", async (req, res) => {
  try {
    await Book.deleteMany();
    await Book.insertMany([
      {
        title: "JavaScript: The Good Parts",
        price: 19.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg",
        description: "A deep dive into the elegant parts of JavaScript, focusing on best practices and language features.",
        reviews: [
          {
            user: undefined,
            rating: 5,
            comment: "A must-read for every JS developer!",
            date: new Date()
          },
          {
            user: undefined,
            rating: 4,
            comment: "Great insights, but a bit advanced for beginners.",
            date: new Date()
          }
        ]
      },
      {
        title: "Eloquent JavaScript",
        price: 24.5,
        image: "https://images-na.ssl-images-amazon.com/images/I/91asIC1fRwL.jpg",
        description: "A modern introduction to programming using JavaScript, covering fundamentals and advanced topics.",
      },
      {
        title: "You Don't Know JS Yet",
        price: 29.0,
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL._AC_UL600_SR600,600_.jpg",
        description: "A deep exploration of JavaScript's core mechanisms and concepts for serious learners.",
      },
      {
        title: "Clean Code",
        price: 32.75,
        image: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        description: "A guide to writing readable, maintainable, and efficient code by Robert C. Martin.",
      },
      {
        title: "The Pragmatic Programmer",
        price: 28.5,
        image: "https://images-na.ssl-images-amazon.com/images/I/518FqJvR9aL._SX377_BO1,204,203,200_.jpg",
        description: "Classic advice and tips for software developers to improve their craft.",
      },
      {
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        price: 39.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg",
        description: "The foundational book on design patterns for object-oriented programming.",
      },
      {
        title: "Head First Design Patterns",
        price: 31.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL._AC_UL600_SR600,600_.jpg",
        description: "A visually rich guide to design patterns for software developers.",
      },

      {
        title: "The Art of Computer Programming",
        price: 99.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX342_SY445_QL70_ML2_.jpg",
        description: "Donald Knuth's classic multi-volume work on algorithms and programming theory.",
      },
      {
        title: "Structure and Interpretation of Computer Programs",
        price: 44.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL._AC_UL600_SR600,600_.jpg",
        description: "A classic text on computer science and programming using Scheme.",
      },
    ]);
    res.send("Seeded books.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: 'reviews.user',
      select: 'fullname email'
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    // Store user as ObjectId
    book.reviews.push({ user, rating, comment });
    await book.save();
    // Populate user info for response
    await book.populate({ path: 'reviews.user', select: 'fullname email' });
    res.status(201).json(book.reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET reviews for a book
router.get("/:id/reviews", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: 'reviews.user',
      select: 'fullname email'
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
