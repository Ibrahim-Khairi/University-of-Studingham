import User from "../models/User.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";
import Admin from "../models/Admin.js";
import ActivityLog from "../models/ActivityLog.js";
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
                    name: `${student.firstName} ${student.middleName} ${student.lastName}`,
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
        const tutor = await Tutor.findOne({ userId: req.user.userId });
        if (!tutor) return res.status(404).json({ message: "Tutor profile not found" });

        if (
            student.courseId.toString() !== tutor.courseId.toString() ||
            student.levelOfStudy !== tutor.year
        ) {
            return res.status(403).json({ message: "Unauthorized student approval" });
        }

        await User.findByIdAndUpdate(student.userId, {
            status: "approved"
        });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "APPROVED_STUDENT",
            target:{
                id: student.userId,
                model: "User"
            },
            description: `Dr. ${tutor.lastName} approved Student registration`
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
        const tutor = await Tutor.findOne({ userId: req.user.userId });
        if (!tutor) return res.status(404).json({ message: "Tutor profile not found" });

        if (
            student.courseId.toString() !== tutor.courseId.toString() ||
            student.levelOfStudy !== tutor.year
        ) {
            return res.status(403).json({ message: "Unauthorized student approval" });
        }


        await User.findByIdAndUpdate(student.userId, {
            status: "rejected"
        });

        if (student.picture) {
            const imagePath = path.join(process.cwd(), student.picture);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await student.deleteOne();

        await ActivityLog.create({
            actor: req.user.userId,
            action: "REJECTED_STUDENT",
            target:{
                id: student.userId,
                model: "User"
            },
            description: `Dr. ${tutor.lastName} rejected Student registration`
        });

        res.json({ message: "Student rejected and deleted successfully" });
    } catch (error) {
        console.error("rejectStudent error:", error);
        res.status(500).json({ message: "Rejection failed" });
    }
}

export const getPendingUsersForAdmin = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const pendingUsers = await User.find({ status: "pending" });

        const results = [];

        for (const user of pendingUsers) {
            if (user.role === "student"){
                const student = await Student.findOne({ userId: user._id });
                if (!student) continue;

                results.push({
                    userId: user._id,
                    profileId: student._id,
                    name: `${student.firstName} ${student.middleName} ${student.lastName}`,
                    role: "Student",
                    email: user.email,
                    phoneNumber: student.phoneNumber
                });
            }

            if (user.role === "tutor") {
                const tutor = await Tutor.findOne({ userId: user._id });
                if (!tutor) continue;

                results.push({
                    userId: user._id,
                    profileId: tutor._id,
                    name: `${tutor.firstName} ${tutor.middleName} ${tutor.lastName}`,
                    role: "Tutor",
                    email: user.email,
                    phoneNumber: tutor.phoneNumber
                });
            }

            if (user.role === "admin") {
                const admin = await Admin.findOne({ userId: user._id });
                if (!admin) continue;

                results.push({
                    userId: user._id,
                    profileId: admin._id,
                    name: `${admin.firstName} ${admin.middleName} ${admin.lastName}`,
                    role: "Admin",
                    email: user.email,
                    phoneNumber: admin.phoneNumber
                });
            }
        }

        res.json({ users: results })
    } catch (error) {
        console.error ("getPendingUsersForAdmin error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const approveUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const { userId } = req.params;
        const APPROVAL_LABELS = {
            student: "Student",
            tutor: "Tutor",
            admin: "Admin"
        }

        const user = await User.findByIdAndUpdate(
            userId, {
                status: "approved"
            }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "APPROVED_USER",
            target:{
                id: userId,
                model: "User"
            },
            description: `Admin approved ${APPROVAL_LABELS[user.role]} registration`
        });

        res.json({ message: "User approved successfully" });
    } catch (error) {
        console.error("approveUser error:", error);
        res.status(500).json({ message: "Approval failed" });
    }
};

export const rejectUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const { userId } = req.params;
        const REJECTION_LABELS = {
            student: "Student",
            tutor: "Tutor",
            admin: "Admin",
        };


        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        let profile = null;
        if (user.role === "student") profile = await Student.findOne({ userId });
        else if (user.role === "tutor") profile = await Tutor.findOne({ userId });
        else if (user.role === "admin") profile = await Admin.findOne({ userId });

        if (profile?.picture) {
            const imagePath = path.join(process.cwd(), profile.picture);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        if (profile) await profile.deleteOne();

        await User.findByIdAndUpdate(userId, {
            status: "rejected"
        });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "REJECTED_USER",
            target:{
                id: userId,
                model: "User"
            },
            description: `Admin rejected ${REJECTION_LABELS[user.role]} registration`
        });

        res.json({ message: "User rejected and profile deleted successfully" });
    } catch (error) {
        console.error("rejectUser error:", error);
        res.status(500).json({ message: "Rejection failed" });
    }
};