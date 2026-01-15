import Lecture from "../models/Lecture.js";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

export const getStudentAttendancePortal = async (req, res) => {
  try {
    const userId = req.user.userId;
    const student = await Student.findOne({ userId });
    if (!student) return res.status(404).json({ message: "Profile not found" });

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const startOfToday = new Date().setHours(0, 0, 0, 0);

    // Get all lectures for this student's course/year today
    const lectures = await Lecture.find({
      courseId: student.courseId,
      year: student.levelOfStudy,
      date: {
        $gte: startOfToday,
        $lt: new Date(startOfToday).setHours(23, 59),
      },
    })
      .populate("moduleId", "name")
      .populate("tutorId", "lastName");

    let displayLecture = null;
    let status = "none";

    // 1. Check for Ongoing
    displayLecture = lectures.find((lec) => {
      const [sH, sM] = lec.startTime.split(":").map(Number);
      const [eH, eM] = lec.endTime.split(":").map(Number);
      return currentMins >= sH * 60 + sM && currentMins <= eH * 60 + eM;
    });

    if (displayLecture) {
      status = "ongoing";
    } else {
      // 2. Else check for next upcoming today
      displayLecture = lectures
        .filter((lec) => {
          const [sH, sM] = lec.startTime.split(":").map(Number);
          return sH * 60 + sM > currentMins;
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];
      if (displayLecture) status = "upcoming";
    }

    // 3. Stats and Check-in status
    const attended = await Attendance.countDocuments({ studentId: userId });
    const isCheckedIn =
      status === "ongoing" &&
      (await Attendance.exists({
        studentId: userId,
        lectureId: displayLecture._id,
      }));

    res.json({
      lecture: displayLecture,
      status,
      isCheckedIn: !!isCheckedIn,
      stats: { attended, percentage: Math.round((attended / 32) * 100) },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitCheckIn = async (req, res) => {
  try {
    await Attendance.create({
      studentId: req.user.userId,
      lectureId: req.body.lectureId,
    });
    res.json({ message: "Attendance verified" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Check-in failed: already logged or invalid session" });
  }
};
// backend/controllers/attendanceController.js

// backend/controllers/attendanceController.js

export const getApprovedStudentsForRoster = async (req, res) => {
  try {
    const { courseId, year } = req.params;

    // 1. Find students in this course and level
    // We populate the userId so we can access the account ID and the approval status
    const students = await Student.find({
      courseId: courseId,
      levelOfStudy: Number(year),
    }).populate("userId", "email status");

    // 2. Filter: Only show students whose account is 'approved'
    const approvedRoster = students.filter(
      (s) => s.userId?.status === "approved"
    );

    res.json(
      approvedRoster.map((s) => ({
        // FIX: We must return the User ID (s.userId._id), not the Student Profile ID (s._id)
        // This ensures the Attendance record matches the ID used by the student to log in.
        _id: s.userId._id,
        profileId: s._id, // Optional: You can keep this for internal reference if needed
        name: `${s.firstName} ${s.lastName}`,
        email: s.userId.email,
      }))
    );
  } catch (error) {
    console.error("Roster Fetch Error:", error);
    res.status(500).json({ message: "Error fetching student roster" });
  }
};
export const submitBulkAttendance = async (req, res) => {
  try {
    const { records } = req.body;
    if (!records) return res.status(400).json({ message: "No data" });

    const updatePromises = records.map((record) => {
      return Attendance.findOneAndUpdate(
        { studentId: record.studentId, lectureId: record.lectureId },
        { status: record.status }, // <--- THIS SAVES THE STATUS
        { upsert: true, new: true }
      );
    });

    await Promise.all(updatePromises);
    res.json({ message: "Attendance synchronized" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// This helps the frontend show saved data when you pick a session
export const getExistingAttendance = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const records = await Attendance.find({ lectureId });

    // FIX: Force studentId to be a string before sending to React
    const sanitizedRecords = records.map((rec) => ({
      studentId: rec.studentId.toString(),
      status: rec.status,
    }));

    res.json(sanitizedRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};
// backend/controllers/attendanceController.js

export const getStudentAttendanceHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Get student profile to know their Course and Year
    const student = await Student.findOne({ userId }).populate(
      "courseId",
      "name"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });

    // 2. Fetch all Attendance records for this student
    // We populate the lecture details so we can see the module name and time
    const history = await Attendance.find({ studentId: userId })
      .populate({
        path: "lectureId",
        populate: { path: "moduleId", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.json({
      studentInfo: {
        name: `${student.firstName} ${student.lastName}`,
        id: student._id.toString().slice(-8).toUpperCase(),
        level: `Level ${student.levelOfStudy} - ${student.courseId.name}`,
      },
      history,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance history" });
  }
};
