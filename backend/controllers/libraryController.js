import Book from "../models/Book.js";
import BorrowRequest from "../models/BorrowRequest.js";
import fs from "fs";
import path from "path";

// 1. Get Library Collection
export const getLibraryCollection = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// 2. Add Book
export const addBook = async (req, res) => {
  try {
    const coverImage = req.file ? `/uploads/books/${req.file.filename}` : null;
    const book = await Book.create({ ...req.body, coverImage });
    res.status(201).json(book);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "ISBN exists" });
    res.status(400).json({ message: "Add failed" });
  }
};

// 3. Update Book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const oldBook = await Book.findById(id);

    if (req.file) {
      if (oldBook?.coverImage) {
        const oldPath = path.join(process.cwd(), oldBook.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.coverImage = `/uploads/books/${req.file.filename}`;
    }

    const updated = await Book.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// 4. Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book?.coverImage) {
      const imgPath = path.join(process.cwd(), book.coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// 5. Get All Requests (ADMIN)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find()
      .populate("studentId", "email")
      .populate("bookId", "title author");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Fetch requests failed" });
  }
};

// 6. Handle Request (Approve/Decline)
export const handleRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body;
    const request = await BorrowRequest.findById(requestId);

    if (action === "Approved") {
      // Set Due Date to 14 days from now
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      request.dueDate = dueDate;
      await Book.findByIdAndUpdate(request.bookId, { status: "Borrowed" });
    }

    request.status = action;
    await request.save();
    res.json({ message: `Request ${action}` });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};
// 7. Student Create Request
export const createBorrowRequest = async (req, res) => {
  try {
    const { bookId } = req.body;
    const studentId = req.user.userId;

    // 1. PENALTY CHECK: Check if this student has any OVERDUE books
    // We look for approved requests where the dueDate is in the past
    const overdueBook = await BorrowRequest.findOne({
      studentId,
      status: "Approved",
      dueDate: { $lt: new Date() }, // Date is less than "Now"
    });

    if (overdueBook) {
      return res.status(403).json({
        message:
          "Request Denied: You have an overdue book. Please return it and clear your fines before borrowing again.",
      });
    }

    // 2. AVAILABILITY CHECK: Check if the book exists and is actually available
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book reference not found in archive." });
    }

    if (book.status !== "Available") {
      return res.status(400).json({
        message: "This item is currently out on loan to another student.",
      });
    }

    // 3. DUPLICATE CHECK: Prevent multiple pending requests for the same book
    const existingPending = await BorrowRequest.findOne({
      studentId,
      bookId,
      status: "Pending",
    });

    if (existingPending) {
      return res.status(400).json({
        message: "You already have a pending request for this specific title.",
      });
    }

    // 4. SUCCESS: Create the request
    await BorrowRequest.create({
      studentId,
      bookId,
      status: "Pending",
      requestDate: new Date(),
    });

    res.status(201).json({
      message: "Request successfully transmitted to Library Administration.",
    });
  } catch (error) {
    console.error("Borrow Request Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error: Failed to process request." });
  }
};
export const getMyLibraryHistory = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // Find all requests for this specific student
    // Populate book details so we can see the Title and Cover Image
    const history = await BorrowRequest.find({ studentId })
      .populate("bookId")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    console.error("Fetch History Error:", error);
    res.status(500).json({ message: "Failed to load your library history" });
  }
};

// --- NEW: RETURN BOOK ---
export const returnBook = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await BorrowRequest.findById(requestId);

    if (!request)
      return res.status(404).json({ message: "Request record not found" });

    // 1. Mark the Book as Available again
    await Book.findByIdAndUpdate(request.bookId, { status: "Available" });

    // 2. Update the Request status to 'Returned'
    request.status = "Returned";
    request.returnDate = new Date();
    await request.save();

    res.json({ message: "Book successfully returned to archive" });
  } catch (error) {
    res.status(500).json({ message: "Server error during return" });
  }
};
