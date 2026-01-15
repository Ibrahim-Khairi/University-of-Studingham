import express from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import {
  createNotice,
  getAllNotices,
  getMyNotices,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

// Public/Shared Route (for Dashboards)
router.get("/my-board", authMiddleware, getMyNotices);

// Admin Only Routes
router.post("/", authMiddleware, roleMiddleware(["admin"]), createNotice);
router.get(
  "/admin-view",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllNotices
);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteNotice);

export default router;
