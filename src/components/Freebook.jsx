import React, { useEffect, useState } from "react";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch("/api/books/free")
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => setBook([]));
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Free Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {book.map((b) => (
          <Cards key={b._id} item={b} />
        ))}
      </div>
    </div>
  );
}
export default Freebook;
