import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadCurriculum from "../middleware/uploadCurriculum.js";
import {
<<<<<<< HEAD
  createModules,
  getModulesByCourse,
  // deleteModulesByCourse,
  // createModulesByBulk,
  toggleVisibility,
  updateCurriculum,
  getAllMyScores,
=======
    createModules,
    getModulesByCourse,
    // deleteModulesByCourse,
    // createModulesByBulk,
    toggleVisibility,
    updateCurriculum,
>>>>>>> f42b66aa02bec63274f1f1fbfff0750fe601fc19
} from "../controllers/moduleController.js";
import { submitQuiz, getMyScores } from "../controllers/moduleController.js";
const router = express.Router();

/**
 * MODULE ROUTES
 */

// Create modules (initial creation)
router.post("/", createModules);

// Get all modules for a course
router.get("/course/:courseId", getModulesByCourse);

// Optional admin utilities (keep commented unless needed)
// router.delete("/course/:courseId", deleteModulesByCourse);
// router.post("/bulk", createModulesByBulk);

// Toggle module visibility (admin)
router.patch("/:moduleId/visibility", authMiddleware, toggleVisibility);

// Upload / update 8-week curriculum (admin / tutor)
router.post(
  "/:moduleId/curriculum",
  authMiddleware,
  uploadCurriculum.any(),
  updateCurriculum
);
router.post("/quiz/submit", authMiddleware, submitQuiz);
router.get("/:moduleId/my-scores", authMiddleware, getMyScores);
router.get("/my-results/all", authMiddleware, getAllMyScores);
export default router;
