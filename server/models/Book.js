import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: { type: String, required: true },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Book", bookSchema);
