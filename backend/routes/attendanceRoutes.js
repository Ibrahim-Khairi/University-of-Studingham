import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getStudentAttendancePortal,
  submitCheckIn,
  getApprovedStudentsForRoster, // New
  getExistingAttendance, // New
  submitBulkAttendance,
  getStudentAttendanceHistory, // New
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/portal", authMiddleware, getStudentAttendancePortal);
router.post("/check-in", authMiddleware, submitCheckIn);

// --- ADD THESE THREE ROUTES ---
router.get(
  "/roster/:courseId/:year",
  authMiddleware,
  getApprovedStudentsForRoster
);
router.get("/existing/:lectureId", authMiddleware, getExistingAttendance);
router.post("/bulk", authMiddleware, submitBulkAttendance);
router.get("/history", authMiddleware, getStudentAttendanceHistory);
export default router;
