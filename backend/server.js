import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js"

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/approval", approvalRoutes);

app.get("/", (req, res) => {
    res.send("API running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);