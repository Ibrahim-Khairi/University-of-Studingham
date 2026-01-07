import express from "express";
import { getMyModules } from "../controllers/tutorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/my-modules", authMiddleware, getMyModules);
export default router;
