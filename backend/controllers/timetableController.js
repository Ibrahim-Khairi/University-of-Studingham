import Lecture from "../models/Lecture.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";

export const getTutorTimetable = async (req, res) => {
    try {
        // authMiddleware places { userId, role } in req.user
        const userId = req.user.userId;
        // Find the Tutor document linked to this User
        const tutorDoc = await Tutor.findOne({ userId });
        if (!tutorDoc) return res.status(404).json({ message: "Tutor profile not found" });
        // const { weekNumber } = req.query;
        //
        // const filter = {
        //     tutorId,
        //     ...(weekNumber && { weekNumber: Number(weekNumber) })
        // };

        // Show only lectures for modules the tutor has selected or lectures explicitly assigned to this tutor
        const lectures = await Lecture
            .find({
                $or: [
                    { tutorId: tutorDoc._id },
                    { moduleId: { $in: tutorDoc.modules || [] } }
                ]
            })
            .populate("moduleId", "name")
            .populate("courseId", "code")
            .populate("tutorId", "firstName lastName");

        res.json({lectures, academicYearStart: "2025-09-22"});
    } catch (err) {
        console.error("getTutorTimetable error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const getStudentTimetable = async (req, res) => {
    try {
        // auth payload contains userId (User collection _id), not the Student _id
        const userId = req.user.userId;
        const { weekNumber } = req.query;

        // Find Student document by linked userId
        const student = await Student.findOne({ userId });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const filter = {
            courseId: student.courseId,
            year: student.levelOfStudy,
            ...(weekNumber
                ? { weekNumber: Number(weekNumber) }
                : { weekNumber: { $gte: 1, $lte: 32 } } // cap to academic weeks 1-32
            )
        };

        const lectures = await Lecture
            .find(filter)
            .populate("moduleId", "name")
            .populate("courseId", "code")
            .populate("tutorId", "firstName lastName");

        res.json({lectures, academicYearStart: "2025-09-22"});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch student timetable" });
    }
};