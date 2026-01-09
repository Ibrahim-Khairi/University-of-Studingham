import express from "express";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAdminProfile, getRecentActivity, getLatestAction, getRecentRegistrations, getPlatformStatus } from "../controllers/adminController.js"

const router = express.Router();

router.get("/profile", authMiddleware, getAdminProfile);
router.get("/recent-activity", authMiddleware, getRecentActivity);
router.get("/latest-action", authMiddleware, getLatestAction);
router.get("/recent-registrations", authMiddleware, getRecentRegistrations);
router.get("/platform-status", authMiddleware, getPlatformStatus);

export default router;