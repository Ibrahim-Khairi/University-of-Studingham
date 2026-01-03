import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth : { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    phoneNumber: { type: String, required: true },
    picture: { type: String },
    password: { type: String },

    courseId: { type: String, required: true },
    year: { type: Number, required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true }],
});

export default mongoose.model("Tutor", tutorSchema);