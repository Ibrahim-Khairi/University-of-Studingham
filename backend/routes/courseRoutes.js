import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCourse, updateCourse, replaceCourseModules } from "../controllers/courseController.js"

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.put("/:courseId",authMiddleware, updateCourse);
router.put("/:courseId/modules", authMiddleware, replaceCourseModules);

export default router;