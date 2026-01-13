import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllPolicies,
  getPolicyByKey,
  updatePolicyByKey,
} from "../controllers/policyController.js";

const router = express.Router();

router.get("/", getAllPolicies);
router.get("/:key", getPolicyByKey);
router.put("/:key", authMiddleware, updatePolicyByKey);

export default router;
