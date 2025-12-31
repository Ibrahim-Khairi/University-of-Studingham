import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth : { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    phoneNumber: { type: String, required: true },
    picture: { type: String },
    password: { type: String, required: true },

    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    levelOfStudy: { type: Number, enum: [1, 2, 3], required: true },
    modeOfStudy: { type: String, enum: ["Full-time", "Part-time"], required: true }
});

export default mongoose.model("Student", studentSchema);