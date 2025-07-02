import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// CREATE a book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ free books (example: price === 0)
router.get("/free", async (req, res) => {
  try {
    const books = await Book.find({ price: 0 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/seed", async (req, res) => {
  await Book.deleteMany();
  await Book.insertMany([
    {
      title: "JavaScript: The Good Parts",
      price: 19.99,
      image:
        "https://m.media-amazon.com/images/I/51gdVAEfPUL._SX379_BO1,204,203,200_.jpg",
    },
    {
      title: "Eloquent JavaScript",
      price: 24.5,
      image:
        "https://m.media-amazon.com/images/I/71fRZp6nSXL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "You Dont Know JS Yet",
      price: 29.0,
      image:
        "https://m.media-amazon.com/images/I/61uYB9HhTEL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "Clean Code",
      price: 32.75,
      image:
        "https://m.media-amazon.com/images/I/41-sN-mzwKL._SX374_BO1,204,203,200_.jpg",
    },
  ]);
  res.send("Seeded books.");
});

export default router;
