import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth : { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    picture: { type: String, required: true },
});

export default mongoose.model("Admin", adminSchema);