import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getStudentAttendancePortal,
  submitCheckIn,
} from "../controllers/attendanceController.js";

const router = express.Router();
router.get("/portal", authMiddleware, getStudentAttendancePortal);
router.post("/check-in", authMiddleware, submitCheckIn);
export default router;
