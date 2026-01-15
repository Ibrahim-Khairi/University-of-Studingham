import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
    // --- ADD THIS FIELD ---
    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      required: true,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ studentId: 1, lectureId: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
