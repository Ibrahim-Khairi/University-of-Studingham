import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: {type: String, required: true, uppercase: true},

    aboutTheCourse: { type: String, required: true },
    courseStructure: { type: String, required: true },
    assessments: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);