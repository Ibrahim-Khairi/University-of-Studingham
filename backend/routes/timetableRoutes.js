import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getTutorTimetable, getStudentTimetable } from "../controllers/timetableController.js";

const router = express.Router();

router.get("/tutor", authMiddleware, getTutorTimetable);

router.get("/student", authMiddleware, getStudentTimetable);

export default router;
