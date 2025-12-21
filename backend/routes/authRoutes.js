import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { statusMiddleware } from "../middleware/statusMiddleware.js";
import { registerStudent, registerTutor, registerAdmin, login, logout, refresh } from "../controllers/authController.js"

const router = express.Router();

router.post("/register/student", registerStudent);
router.post("/register/tutor", registerTutor);
router.post("/register/admin", registerAdmin);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
// router.get("/student/dashboard", authMiddleware, roleMiddleware(["student"]), statusMiddleware(["approved"]), studentDashboard);
// Route for testing the middleware:
router.get("/student/dashboard", authMiddleware, roleMiddleware(["student"]), statusMiddleware(["approved"]),
    (req, res) => {
        res.json({
            message: "Middleware passed successfully",
            user: req.user,
        });
    }
);
router.get("/tutor/dashboard", authMiddleware, roleMiddleware(["tutor"]), statusMiddleware(["approved"]),
    (req, res) => {
        res.json({
            message: "Middleware passed successfully",
            user: req.user,
        });
    }
);

export default router;