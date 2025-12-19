import express from "express";
import { createCourse, createModule, getCourses, getModulesByCourse } from "../controllers/setupController.js";

const router = express.Router();

router.post("/course", createCourse);
router.post("/module", createModule);
router.get("/courses", getCourses);
router.get("/modules/:courseId", getModulesByCourse);

export default router;