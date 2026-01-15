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
  },
  { timestamps: true }
); // This automatically creates 'createdAt' and 'updatedAt'

// Ensures a student can only check in once per lecture
attendanceSchema.index({ studentId: 1, lectureId: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
