import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Grading", "Meetings", "Preparations", "Emails"],
      default: "Emails",
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
