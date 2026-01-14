import mongoose from "mongoose";

const lecturePatternSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },

    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },

    year: { type: Number, enum: [1, 2, 3], required: true },

    weekBlock: {
        start: { type: Number, required: true },
        end: { type: Number, required: true }
    },

    pattern: [
        {
            day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], required: true },
            startTime: { type: String, required: true },
            durationHours: { type: Number, min: 1, max: 3 }
        }
    ],
    academicYearStart: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("LecturePattern", lecturePatternSchema);