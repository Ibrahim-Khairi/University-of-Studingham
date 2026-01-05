import express from "express";
import multer from "multer";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { statusMiddleware } from "../middleware/statusMiddleware.js";
import uploadStudent from "../middleware/uploadStudentImage.js";
import uploadTutor from "../middleware/uploadTutorImage.js";
import uploadAdmin from "../middleware/uploadAdminImage.js";
import { registerStudent, registerTutor, registerAdmin, login, logout, refresh } from "../controllers/authController.js"

const router = express.Router();

router.post(
    "/register/student",
    (req, res, next) => {
        uploadStudent.single("picture")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ message: "Image must be under 300kb" });
            }

            if (err) return res.status(400).json({ message: err.message });
            next();
        });
    },
    registerStudent
);
router.post(
    "/register/tutor",
    (req, res, next) => {
        uploadTutor.single("picture")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ message: "Image must be under 300kb" });
            }

            if (err) return res.status(400).json({ message: err.message });
            next();
        });
    },
    registerTutor
);
router.post("/register/admin",
    (req, res, next) => {
        uploadAdmin.single("picture")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ message: "Image must be under 300kb" });
            }

            if (err) return res.status(400).json({ message: err.message });
            next();
        });
    },
    registerAdmin
);

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select(
            "_id email role status createdAt"
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user)
    } catch (error) {
        console.error("GET /auth/me error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

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