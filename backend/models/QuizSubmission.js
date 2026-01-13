import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    weekNumber: { type: Number, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
  },
  { timestamps: true }
);

// CRITICAL: Prevent double submissions
quizSubmissionSchema.index(
  { studentId: 1, moduleId: 1, weekNumber: 1 },
  { unique: true }
);

export default mongoose.model("QuizSubmission", quizSubmissionSchema);
