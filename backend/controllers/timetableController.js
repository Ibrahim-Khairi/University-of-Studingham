import Lecture from "../models/Lecture.js";
import Student from "../models/Student.js";

export const getTutorTimetable = async (req, res) => {
    try {
        const tutorId = req.user._id;
        const { weekNumber } = req.query;

        const filter = {
            tutorId,
            ...(weekNumber && { weekNumber: Number(weekNumber) })
        };

        const lectures = await Lecture
            .find(filter)
            .populate("moduleId", "name code")
            .populate("courseId", "name");

        res.json(lectures);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tutor timetable" });
    }
};

export const getStudentTimetable = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { weekNumber } = req.query;

        const student = await Student.findById(studentId);

        const filter = {
            courseId: student.courseId,
            year: student.year,
            ...(weekNumber && { weekNumber: Number(weekNumber) })
        };

        const lectures = await Lecture
            .find(filter)
            .populate("moduleId", "name code")
            .populate("tutorId", "name");

        res.json(lectures);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch student timetable" });
    }
};