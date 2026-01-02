import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import { getPendingStudentsForTutor, approveStudent, rejectStudent } from "../controllers/approvalController.js";

const router = express.Router();

router.get("/tutor/students", authMiddleware, getPendingStudentsForTutor);
router.patch("/students/:studentId/approve", authMiddleware, approveStudent);
router.patch("/students/:studentId/reject", authMiddleware, rejectStudent)

export default router;