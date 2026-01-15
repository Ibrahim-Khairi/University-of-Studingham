import Notice from "../models/Notice.js";

// 1. Admin: Create Notice with 3-slot Limit Logic
export const createNotice = async (req, res) => {
  try {
    const { title, content, target, priority } = req.body;

    // Calculate current counts
    // "all" counts as a slot for both students and tutors
    const studentNoticesCount = await Notice.countDocuments({
      target: { $in: ["student", "all"] },
    });
    const tutorNoticesCount = await Notice.countDocuments({
      target: { $in: ["tutor", "all"] },
    });

    if (target === "student" && studentNoticesCount >= 3) {
      return res
        .status(400)
        .json({ message: "Student noticeboard is full (Max 3)." });
    }
    if (target === "tutor" && tutorNoticesCount >= 3) {
      return res
        .status(400)
        .json({ message: "Tutor noticeboard is full (Max 3)." });
    }
    if (
      target === "all" &&
      (studentNoticesCount >= 3 || tutorNoticesCount >= 3)
    ) {
      return res.status(400).json({
        message: "Cannot broadcast to everyone: One or both boards are full.",
      });
    }

    const notice = await Notice.create({
      title,
      content,
      target,
      priority,
      createdBy: req.user.userId,
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: "Server error creating notice" });
  }
};

// 2. Admin: Get all notices for management
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// 3. User (Student/Tutor): Get notices relevant to them
export const getMyNotices = async (req, res) => {
  try {
    const userRole = req.user.role; // from authMiddleware
    // Students see: "student" and "all"
    // Tutors see: "tutor" and "all"
    const notices = await Notice.find({
      target: { $in: [userRole, "all"] },
    }).sort({ createdAt: -1 });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
};

// 4. Admin: Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice removed" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
