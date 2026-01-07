import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";
<<<<<<< HEAD
import approvalRoutes from "./routes/approvalRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
dotenv.config();

const app = express();
app.use(
  cors({
=======
import approvalRoutes from "./routes/approvalRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import moduleRoutes from "./routes/moduleRoutes.js"
import policyRoutes from "./routes/policyRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
<<<<<<< HEAD
  })
);
=======
}));
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/policies", policyRoutes);
<<<<<<< HEAD
app.use("/api/tutors", tutorRoutes);
app.get("/", (req, res) => {
  res.send("API running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
=======

app.get("/", (req, res) => {
    res.send("API running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
