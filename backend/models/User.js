import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, enum: ["student", "tutor", "admin"], required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },

}, { timestamps: true });

export default mongoose.model("User", userSchema);