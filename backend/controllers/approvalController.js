import User from "../models/User.js";
import Tutor from "../models/Tutor.js";
import Student from "../models/Student.js";
import fs from "fs";
import path from "path";

export const getPendingStudentsForTutor = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const tutor = await Tutor.findOne({ userId: req.user.id });
        if (!tutor) return res.status(403).json({ message: "Not authorized" });

        const students = await Student.find({
            courseId: tutor.courseId,
            year: tutor.year
        }).populate("userId", "email status").where("userId.status").equals("pending");

        res.json(students);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch pending students" });
    }
};

export const approveStudent = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const user = await User.findById(student.userId);
        user.status = "approved";
        await user.save();

        res.json({ message: "Student approved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Approval failed" });
    }
};

export const rejectStudent = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const user = await User.findById(student.userId);

        if (student.picture) {
            const imagePath = path.join(process.cwd(), student.picture);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await student.deleteOne();
        await user.deleteOne();

        res.json({ message: "Student rejected and deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Rejection failed" });
    }
}