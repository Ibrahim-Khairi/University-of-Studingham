import express from "express";
<<<<<<< HEAD
import {
  createModules,
  getModulesByCourse,
  deleteModulesByCourse,
  createModulesByBulk,
} from "../controllers/moduleController.js";
=======
import { createModules, getModulesByCourse, deleteModulesByCourse, createModulesByBulk } from "../controllers/moduleController.js";
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a

const router = express.Router();

router.post("/", createModules);
router.get("/course/:courseId", getModulesByCourse);
router.delete("/course/:courseId", deleteModulesByCourse);
router.post("/bulk", createModulesByBulk);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
