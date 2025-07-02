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
