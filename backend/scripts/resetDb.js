import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Lecture from "../models/Lecture.js";
import LecturePattern from "../models/LecturePattern.js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";
import Admin from "../models/Admin.js";
import RefreshToken from "../models/RefreshToken.js";
import ActivityLog from "../models/ActivityLog.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined. Check your .env file and dotenv path.");
}

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to DB - starting FULL RESET");

const adminUser = await User.findOne({ email: "admin1@gmail.com" });

if (!adminUser) {
    console.error("Admin 1 user NOT FOUND - aborting reset");
    process.exit(1);
}

await Lecture.deleteMany({});
await LecturePattern.deleteMany({});
await Module.deleteMany({});
await Course.deleteMany({});
await Student.deleteMany({});
await Tutor.deleteMany({});
await Admin.deleteMany({ userId: { $ne: adminUser._id } });
await User.deleteMany({ _id: { $ne: adminUser._id } });
await RefreshToken.deleteMany({});
await ActivityLog.deleteMany({});

console.log("DATABASE RESET COMPLETE");
console.log("Preserved: Admin 1 only");
process.exit(0);