import express from "express";
import { authMiddleware} from "../middleware/authMiddleware.js";
import { upsertLecturePatterns, getLecturePatternsByCourse } from "../controllers/lecturePatternsController.js";

const router = express.Router();

router.get("/course/:courseId", authMiddleware, getLecturePatternsByCourse);
router.put("/course/:courseId", authMiddleware, upsertLecturePatterns);

export default router;