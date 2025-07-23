import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [authUser] = useContext(AuthContext);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load book details.");
        setLoading(false);
      });
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/books/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: authUser?._id, rating, comment }),
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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!book) return <div className="p-8 text-center">Book not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <img src={book.image} alt={book.title} className="w-48 h-48 object-cover mb-4 mx-auto" />
      <div className="mb-4">
        <span className="font-bold">Price:</span> ${book.price}
      </div>
      <div className="mb-4">
        <span className="font-bold">Description:</span>
        <p className="mt-2">{book.description}</p>
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
      {authUser && (
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
  );
};

export default BookDetails;
