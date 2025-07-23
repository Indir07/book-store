import React, { useState } from "react";

const BookModal = ({ book, onClose, user }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(book.reviews || []);
  const [message, setMessage] = useState("");

  const handleReview = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/books/${book._id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user._id, rating, comment }),
    });
    const data = await res.json();
    if (res.ok) {
      setReviews(data);
      setComment("");
      setMessage("Review submitted!");
    } else {
      setMessage(data.message || "Error submitting review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <img src={book.image} alt={book.title} className="w-32 h-32 object-cover mb-2" />
        <p className="mb-2">{book.description || "No description available."}</p>
        <div className="mb-4">
          <span className="font-bold">Price:</span> ${book.price}
        </div>
        <h3 className="font-bold mb-2">Reviews</h3>
        <div className="mb-4 max-h-40 overflow-y-auto">
          {reviews.length === 0 ? (
            <div>No reviews yet.</div>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="mb-2 p-2 border-b">
                <div className="font-semibold">{r.user?.fullname || "Anonymous"}</div>
                <div>Rating: {r.rating} / 5</div>
                <div>{r.comment}</div>
                <div className="text-xs text-gray-500">{new Date(r.date).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
        {user && (
          <form onSubmit={handleReview} className="mb-2">
            <div className="flex items-center mb-2">
              <label className="mr-2">Rating:</label>
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <textarea
              className="input w-full mb-2"
              placeholder="Leave a review..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}
        {message && <div className="text-green-500 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default BookModal;
