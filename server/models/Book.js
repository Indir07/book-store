import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
});

export default mongoose.model("Book", bookSchema);
