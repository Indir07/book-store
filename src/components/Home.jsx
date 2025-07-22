import React, { useEffect, useState } from "react";
import Cards from "./Cards";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched books:', data);
        setBooks(data);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setBooks([]);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Featured Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No books found.</div>
        ) : (
          books.map((book) => (
            <Cards key={book._id || book.title} item={book} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
