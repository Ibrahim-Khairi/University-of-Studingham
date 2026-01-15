import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    target: {
      type: String,
      enum: ["student", "tutor", "all"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["urgent", "normal", "social"],
      default: "normal",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);
