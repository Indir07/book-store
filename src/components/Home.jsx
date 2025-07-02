import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">
        Welcome to DevBookStore!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8 text-center">
        Discover amazing programming books and enhance your skills.
      </p>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-40 h-56 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {book.title}
              </h2>
              <p className="text-pink-500 font-semibold mb-2">
                ${book.price.toFixed(2)}
              </p>
              <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
