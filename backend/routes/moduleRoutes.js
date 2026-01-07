import express from "express";
import {
  createModules,
  getModulesByCourse,
  deleteModulesByCourse,
  createModulesByBulk,
} from "../controllers/moduleController.js";

const router = express.Router();

router.post("/", createModules);
router.get("/course/:courseId", getModulesByCourse);
router.delete("/course/:courseId", deleteModulesByCourse);
router.post("/bulk", createModulesByBulk);

export default router;
