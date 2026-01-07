import express from "express";
import { createCourse, updateCourse } from "../controllers/courseController.js"

const router = express.Router();

router.post("/", createCourse);
router.put("/:courseId", updateCourse);

export default router;