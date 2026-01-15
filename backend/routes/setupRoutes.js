import express from "express";
import {
  createCourse,
  createModule,
  getCourses,
  getModulesByCourseByYear,
  getCourseById,
} from "../controllers/setupController.js";

const router = express.Router();

router.post("/course", createCourse);
router.post("/module", createModule);
router.get("/courses", getCourses);
router.get("/modules/:courseId/:year", getModulesByCourseByYear);
router.get("/course/:id", getCourseById);
export default router;
