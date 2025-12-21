import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    course: { type: String, required: true },
    modules: [{type: String, required: true}],
});

export default mongoose.model("Tutor", tutorSchema);