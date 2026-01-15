import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import lecturePatternsRoutes from "./routes/lecturePatternsRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js"; // Fixed: Added full import path

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lecture-patterns", lecturePatternsRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/attendance", attendanceRoutes); // Correctly registered here

app.get("/", (req, res) => {
  res.send("API running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
