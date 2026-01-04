import User from "../models/User.js";
import Tutor from "../models/Tutor.js";
import Student from "../models/Student.js";
import fs from "fs";
import path from "path";

export const getPendingStudentsForTutor = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const tutor = await Tutor.findOne({ userId: req.user.userId })
            .populate({ path: "courseId", select: "name code"});
        if (!tutor) return res.status(403).json({ message: "Tutor profile not found" });

        const students = await Student.find({
            courseId: tutor.courseId._id,
            levelOfStudy: tutor.year,
        }).populate({path: "userId", select: "email status"});
        const pendingStudents = students.filter((student) => student.userId?.status === "pending");

        res.json({
            courseName: tutor.courseId.name,
            courseCode: tutor.courseId.code,
            students: pendingStudents.map((student) => ({
                    id: student._id,
                    name: `${student.firstName} ${student.lastName}`,
                    email: student.userId.email,
                    phoneNumber: student.phoneNumber,
                    courseId: student.courseId,
                    levelOfStudy: student.levelOfStudy
                }
            ))
        });
    } catch (error) {
        console.error("getPendingStudentsForTutor error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const approveStudent = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await User.findByIdAndUpdate(student.userId, {
            status: "approved"
        });

        res.json({ message: "Student approved successfully" });
    } catch (error) {
        console.error("approveStudent error:", error);
        res.status(500).json({ message: "Approval failed" });
    }
};

export const rejectStudent = async (req, res) => {
    try {
        if (req.user.role !== "tutor") return res.status(403).json({ message: "Access denied" });

        const { studentId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await User.findByIdAndUpdate(student.userId, {
            status: "rejected"
        });

        if (student.picture) {
            const imagePath = path.join(process.cwd(), student.picture);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await student.deleteOne();

        res.json({ message: "Student rejected and deleted successfully" });
    } catch (error) {
        console.error("rejectStudent error:", error);
        res.status(500).json({ message: "Rejection failed" });
    }
}