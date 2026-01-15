import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getFinanceData,
  updateBudgetAndSavings, // <--- Change this import
  addExpense,
} from "../controllers/financeController.js";

const router = express.Router();

router.get("/", authMiddleware, getFinanceData);

// CHANGE THIS: Use updateBudgetAndSavings instead of updateBudget
router.post("/budget", authMiddleware, updateBudgetAndSavings);

router.post("/expense", authMiddleware, addExpense);

export default router;
