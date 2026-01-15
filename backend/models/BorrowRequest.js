import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined", "Returned"],
      default: "Pending",
    },
    requestDate: { type: Date, default: Date.now },
    dueDate: { type: Date }, // <--- NEW: Set when approved
    returnDate: { type: Date },
    fineAmount: { type: Number, default: 0 }, // <--- NEW: Track money owed
  },
  { timestamps: true }
);

export default mongoose.model("BorrowRequest", borrowRequestSchema);
