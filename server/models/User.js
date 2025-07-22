import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
