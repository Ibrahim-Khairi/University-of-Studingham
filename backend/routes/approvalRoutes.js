import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import {
    getPendingStudentsForTutor,
    approveStudent,
    rejectStudent,
    getPendingUsersForAdmin,
    approveUser,
    rejectUser
} from "../controllers/approvalController.js";

const router = express.Router();

router.get("/tutor/students", authMiddleware, getPendingStudentsForTutor);
router.patch("/students/:studentId/approve", authMiddleware, approveStudent);
router.patch("/students/:studentId/reject", authMiddleware, rejectStudent)
router.get("/admin/users", authMiddleware, getPendingUsersForAdmin);
router.patch("/users/:userId/approve", authMiddleware, approveUser);
router.patch("/users/:userId/reject", authMiddleware, rejectUser);

export default router;