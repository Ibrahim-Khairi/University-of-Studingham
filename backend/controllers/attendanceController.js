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
