import express from "express";
import { getAllPolicies, getPolicyByKey, updatePolicyByKey } from "../controllers/policyController.js";

const router = express.Router();

router.get("/", getAllPolicies);
router.get("/:key", getPolicyByKey);
router.put("/:key", updatePolicyByKey);

export default router;