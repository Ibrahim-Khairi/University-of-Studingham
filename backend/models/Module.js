import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },

    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", default: null },

    year: { type: Number, enum: [1, 2, 3], required: true },

    description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Module", moduleSchema);