import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    target: {
        id: { type: mongoose.Schema.Types.ObjectId },
        model: { type: String, enum: ["User", "Course", "Policy", "File"] }
    },
    description: { type: String, required: true },
    meta: {
        name: String,
        email: String,
        role: String,
        courseName: String,
        courseCode: String
    }
}, { timestamps: true });

export default mongoose.model("ActivityLog", activityLogSchema);