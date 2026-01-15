import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addBook,
  updateBook,
  deleteBook,
  getAllRequests,
  handleRequest,
  getLibraryCollection,
  createBorrowRequest,
  // --- ADD THESE TWO IMPORTS ---
  getMyLibraryHistory,
  returnBook,
} from "../controllers/libraryController.js";
import uploadBookCover from "../middleware/uploadBookCover.js";

const router = express.Router();

// Student / Public Routes
router.get("/collection", getLibraryCollection);
router.post("/request", authMiddleware, createBorrowRequest);

// --- ADD THESE TWO NEW ROUTES ---
router.get("/my-history", authMiddleware, getMyLibraryHistory);
router.patch("/return-book", authMiddleware, returnBook);

// Admin Only Routes
router.post("/add", authMiddleware, uploadBookCover.single("cover"), addBook);
router.put(
  "/update/:id",
  authMiddleware,
  uploadBookCover.single("cover"),
  updateBook
);
router.delete("/book/:id", authMiddleware, deleteBook);
router.get("/admin/requests", authMiddleware, getAllRequests);
router.patch("/admin/handle-request", authMiddleware, handleRequest);

export default router;
