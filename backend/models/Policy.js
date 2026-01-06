import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    key: { type: String, enum:["terms", "privacy", "accessibility"], required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Policies", policySchema);