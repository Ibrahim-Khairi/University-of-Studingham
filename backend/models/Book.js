import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    // --- NEW FIELDS ---
    subject: { type: String },
    publisher: { type: String },
    publishedDate: { type: String },
    language: { type: String, default: "English" },
    coverImage: { type: String }, // Path to the uploaded image
    status: {
      type: String,
      enum: ["Available", "Borrowed"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
