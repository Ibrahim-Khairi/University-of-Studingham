import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  User,
  Hash,
  BookOpen,
  Building,
  CalendarDays,
  Languages,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import Librarynav from "../components/librarycomponents/Librarynav";
import Footer from "../components/homecomponents/Footer";

const Bookdetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch all books and find the one matching the ID
        const res = await axios.get(`${BASE_URL}/api/library/collection`);
        const found = res.data.find((b) => b._id === id);
        setBook(found);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleBorrowRequest = async () => {
    if (!token) return alert("Please login first");

    setIsRequesting(true);
    try {
      await axios.post(
        `${BASE_URL}/api/library/request`,
        { bookId: book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Borrow request sent! Awaiting Admin approval.");
      navigate("/student/library-history"); // Redirect to history to see pending request
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    } finally {
      setIsRequesting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase text-gray-400 animate-pulse">
        Scanning Archive...
      </div>
    );
  if (!book)
    return (
      <div className="p-20 text-center uppercase font-black text-red-500">
        Book Reference Not Found
      </div>
    );

  return (
    <div className="bg-[#F7F7F8] min-h-screen font-[Century Gothic]">
      <Librarynav />

      <div className="container mx-auto px-6 md:px-12 pb-6">
        {/* Navigation Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#72333B] transition-all font-black uppercase text-[10px] tracking-widest mb-10 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Collection
        </button>

        <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row max-w-6xl mx-auto">
          {/* LEFT: BOOK PREVIEW */}
          <div className="lg:w-2/5 bg-gray-50 p-12 flex items-center justify-center relative">
            {/* Subtle spine shadow */}
            <div className="absolute inset-y-0 left-0 w-10 bg-black/5 blur-lg" />
            <img
              src={
                book.coverImage
                  ? `${BASE_URL}${book.coverImage}`
                  : "/librarycollection.png"
              }
              className="w-full max-w-[320px] rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-[12px] border-white transition-transform duration-700 hover:scale-105"
              alt="book cover"
            />
          </div>

          {/* RIGHT: CONTENT & ACTION */}
          <div className="lg:w-3/5 p-12 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[#388F96] mb-4">
              <Bookmark size={18} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                {book.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
              {book.title}
            </h1>

            <div className="flex items-center gap-2 mb-10">
              <div
                className={`w-2 h-2 rounded-full ${
                  book.status === "Available"
                    ? "bg-[#407008] shadow-[0_0_10px_#407008]"
                    : "bg-orange-500"
                }`}
              />
              <p
                className={`text-[10px] font-black uppercase tracking-widest ${
                  book.status === "Available"
                    ? "text-[#407008]"
                    : "text-orange-500"
                }`}
              >
                {book.status === "Available"
                  ? "Status: Available for borrowing"
                  : "Status: Out of Stock / In Use"}
              </p>
            </div>

            {/* DATA TABLE - Matches your Screenshot design */}
            <div className="border border-gray-100 rounded-[30px] overflow-hidden mb-12 shadow-sm">
              <DataRow
                label="Author(s)"
                value={book.author}
                icon={<User size={14} />}
              />
              <DataRow
                label="ISBN"
                value={book.isbn}
                icon={<Hash size={14} />}
              />
              <DataRow
                label="Subject(s)"
                value={book.subject || "General Academic"}
                icon={<BookOpen size={14} />}
              />
              <DataRow
                label="Publisher"
                value={book.publisher || "Studingham Press"}
                icon={<Building size={14} />}
              />
              <DataRow
                label="Release Date"
                value={book.publishedDate || "2024"}
                icon={<CalendarDays size={14} />}
              />
              <DataRow
                label="Language"
                value={book.language || "English"}
                icon={<Languages size={14} />}
                isLast
              />
            </div>

            {/* BORROW BUTTON */}
            <button
              onClick={handleBorrowRequest}
              disabled={book.status !== "Available" || isRequesting}
              className={`w-full lg:w-fit px-20 py-6 rounded-[25px] font-black uppercase text-sm tracking-[0.2em] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                book.status === "Available"
                  ? "bg-[#C84D09] text-white hover:bg-[#a63f07] hover:shadow-orange-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isRequesting
                ? "Submitting Request..."
                : book.status === "Available"
                ? "Confirm Borrow Request"
                : "Currently Borrowed"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Sub-component for the Info Rows
const DataRow = ({ label, value, icon, isLast }) => (
  <div className={`flex border-gray-50 ${!isLast ? "border-b" : ""} group`}>
    <div className="w-1/3 bg-gray-50/50 p-5 flex items-center gap-3 border-r border-gray-50">
      <span className="text-gray-300 group-hover:text-[#388F96] transition-colors">
        {icon}
      </span>
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <div className="flex-1 p-5 pl-8 text-[11px] font-black text-gray-700 uppercase tracking-tight group-hover:bg-gray-50/30 transition-all">
      {value}
    </div>
  </div>
);

export default Bookdetail;
