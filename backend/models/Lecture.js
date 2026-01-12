import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", default: null },

    year: { type: Number, enum: [1, 2, 3], required: true},

    weekNumber: { type: Number, required: true},
    date: { type: Date, required: true },
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], required: true},

    startTime: { type: String, required: true },
    endTime: { type: String, required: true },

    room: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Lecture", lectureSchema);