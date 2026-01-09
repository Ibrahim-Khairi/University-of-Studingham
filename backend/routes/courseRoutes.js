import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCourse, updateCourse } from "../controllers/courseController.js"

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.put("/:courseId",authMiddleware, updateCourse);

export default router;