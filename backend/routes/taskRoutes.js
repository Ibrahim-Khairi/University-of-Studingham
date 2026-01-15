import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// All task routes require being logged in
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.patch("/toggle/:id", authMiddleware, toggleTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
