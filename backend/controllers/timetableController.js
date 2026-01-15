import Lecture from "../models/Lecture.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";

export const getTutorTimetable = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { moduleId } = req.query; // <--- GET THE CLICKED MODULE ID

    const tutorDoc = await Tutor.findOne({ userId });
    if (!tutorDoc) return res.status(404).json({ message: "Tutor not found" });

    // 1. Build the filter
    let filter = {
      $or: [
        { tutorId: tutorDoc._id },
        { moduleId: { $in: tutorDoc.modules || [] } },
      ],
    };

    // 2. THE FIX: If the tutor clicked a specific module, ONLY show those sessions
    if (moduleId) {
      filter = { moduleId: moduleId };
    }

    const lectures = await Lecture.find(filter)
      .populate("moduleId", "name")
      .populate("courseId", "code")
      .sort({ date: 1, startTime: 1 }); // Sort by date so they appear in order

    res.json({ lectures, academicYearStart: "2025-09-22" });
  } catch (err) {
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
        : { weekNumber: { $gte: 1, $lte: 32 } }), // cap to academic weeks 1-32
    };

    const lectures = await Lecture.find(filter)
      .populate("moduleId", "name")
      .populate("courseId", "code")
      .populate("tutorId", "firstName lastName");

    res.json({ lectures, academicYearStart: "2025-09-22" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student timetable" });
  }
};
