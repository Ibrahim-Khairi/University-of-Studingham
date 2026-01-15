import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Course from "../models/Course.js";
import ActivityLog from "../models/ActivityLog.js";
import Tutor from "../models/Tutor.js";

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({ userId: req.user.userId });

    if (!admin)
      return res.status(404).json({ message: "Admin profile not found." });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate("actor", "email role")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent activity" });
  }
};

export const getLatestAction = async (req, res) => {
  try {
    const latestAction = await ActivityLog.findOne().sort({ createdAt: -1 });

    console.log("LATEST ACTION RAW: ", latestAction);

    res.json(latestAction);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest action" });
  }
};

// export const getRecentRegistrations = async (req, res) => {
//     try {
//         const recentRegistrations = await ActivityLog
//             .find({
//                 action: { $in: [
//                         "STUDENT_REGISTRATION",
//                         "TUTOR_REGISTRATION",
//                         "ADMIN_REGISTRATION"
//                     ] }
//             })
//             .sort({ createdAt: -1 })
//             .limit(4)
//             .select("meta action createdAt");
//
//         res.json(recentRegistrations);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch recent registrations" });
//     }
// };

export const getRecentRegistrations = async (req, res) => {
  try {
    const recentRegistrations = await ActivityLog.find({
      action: {
        $in: [
          "STUDENT_REGISTRATION",
          "TUTOR_REGISTRATION",
          "ADMIN_REGISTRATION",
        ],
      },
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .populate(
        "target.id",
        "firstName middleName lastName email role courseName courseCode"
      );

    // map results to always have a meta object
    const mappedRegistrations = recentRegistrations.map((reg) => ({
      _id: reg._id,
      meta: reg.meta || {
        // fallback if meta is missing
        name: reg.target.id
          ? `${reg.target.id.firstName || ""} ${
              reg.target.id.middleName || ""
            } ${reg.target.id.lastName || ""}`.trim() || "Unknown User"
          : "Unknown User",
        email: reg.meta?.email || reg.target.id?.email || "No email",
        role: reg.meta?.role || reg.target.id?.role || "Unknown Role",
        courseName: reg.meta?.courseName || reg.target.id?.courseName || "",
        courseCode: reg.meta?.courseCode || reg.target.id?.courseCode || "",
      },
      createdAt: reg.createdAt,
    }));

    res.json(mappedRegistrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent registrations" });
  }
};

export const getPlatformStatus = async (req, res) => {
  console.log("Logged in user:", req.user?.id);

  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const students = await User.countDocuments({ role: "student" });
    const tutors = await User.countDocuments({ role: "tutor" });
    const admins = await User.countDocuments({ role: "admin" });
    const courses = await Course.countDocuments();

    const data = { students, tutors, admins, courses };
    console.log("Platform status payload:", data);

    res.json(data);
  } catch (error) {
    console.error("getPlatformStatus error:", error);
    res.status(500).json({ message: "Failed to fetch platform status" });
  }
};
export const getPublicStaff = async (req, res) => {
  try {
    // Fetch all tutors and their user account status
    const tutors = await Tutor.find().populate("userId", "status email");

    // Only show approved staff members
    const approvedStaff = tutors.filter((t) => t.userId?.status === "approved");

    res.json(
      approvedStaff.map((t) => ({
        id: t._id,
        name: `${t.firstName} ${t.lastName}`,
        email: t.userId.email,
        phone: t.phoneNumber,
        picture: t.picture,
        role: "Instructor",
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff directory" });
  }
};
export const getPublicCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("name code aboutTheCourse");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};
export const getPublicAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate("userId", "status email");
    const approvedAdmins = admins.filter(
      (a) => a.userId?.status === "approved"
    );
    res.json(
      approvedAdmins.map((a) => ({
        id: a._id,
        name: `${a.firstName} ${a.lastName}`,
        email: a.userId.email,
        phone: a.phoneNumber,
        picture: a.picture,
        role: "University Administration",
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins" });
  }
};
