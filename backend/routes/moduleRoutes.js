import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadCurriculum from "../middleware/uploadCurriculum.js";
import {
  createModules,
  getModulesByCourse,
  deleteModulesByCourse,
  createModulesByBulk,
  toggleVisibility,
  updateCurriculum,
} from "../controllers/moduleController.js";
import { submitQuiz, getMyScores } from "../controllers/moduleController.js";
const router = express.Router();

// --- Existing Routes ---
router.post("/", createModules);
router.get("/course/:courseId", getModulesByCourse);
// router.delete("/course/:courseId", deleteModulesByCourse);
// router.post("/bulk", createModulesByBulk);

router.patch("/:moduleId/visibility", authMiddleware, toggleVisibility);

router.post(
  "/:moduleId/curriculum",
  authMiddleware,
  uploadCurriculum.any(),
  updateCurriculum
);
router.post("/quiz/submit", authMiddleware, submitQuiz);
router.get("/:moduleId/my-scores", authMiddleware, getMyScores);

export default router;
