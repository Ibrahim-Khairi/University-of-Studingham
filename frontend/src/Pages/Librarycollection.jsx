import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/homecomponents/Footer";
import Librarynav from "../components/librarycomponents/Librarynav";
import {
  BookOpen,
  User,
  ArrowRight,
  Bookmark,
  SearchX,
  XCircle,
  Search,
} from "lucide-react";

const Librarycollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ADD SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/library/collection`);
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to load library collection");
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchBooks();
  }, []);

  // 2. FILTER LOGIC
  // We filter the books array in real-time based on the searchQuery
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-[#F7F7F8] min-h-screen font-[Century Gothic]">
      <Librarynav />

      {/* SEARCH BAR SECTION */}
      <div>
        <div className="flex justify-center my-8">
          <div className="relative w-[450px]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery} // Bind to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on type
              className="border-2 border-gray-100 bg-white rounded-2xl pl-12 pr-4 py-3 w-full font-bold text-sm focus:border-[#72333B] outline-none transition-all shadow-sm"
              placeholder="Search by title, author, or ISBN..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pb-20">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-3 text-[#72333B] mb-4">
              <Bookmark size={24} fill="currentColor" />
              <p className="text-xs font-black uppercase tracking-[0.4em]">
                Digital Archive
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              University <br />{" "}
              <span className="text-[#388F96]">Collection</span>
            </h1>
          </div>
          <div className="mt-6 md:mt-0 text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Results Found
            </p>
            <p className="text-3xl font-black text-gray-800">
              {filteredBooks.length}
            </p>
          </div>
        </div>

        {/* LIST RENDER */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[40px] h-[500px] animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredBooks.map((book) => (
              <Link
                to={`/student/book-detail/${book._id}`}
                key={book._id}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] rounded-[35px] overflow-hidden shadow-md group-hover:shadow-[0_20px_50px_rgba(114,51,59,0.2)] transition-all duration-500 bg-gray-200">
                  <img
                    src={
                      book.coverImage
                        ? `${BASE_URL}${book.coverImage}`
                        : "/librarycollection.png"
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={book.title}
                  />
                  <div className="absolute inset-y-0 left-0 w-4 bg-black/10 backdrop-blur-[1px]" />
                  <div className="absolute top-6 right-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border ${
                        book.status === "Available"
                          ? "bg-[#407008]/90 text-white border-green-400/30"
                          : "bg-orange-500/90 text-white border-orange-400/30"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-[#72333B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white text-[#72333B] p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      <ArrowRight size={30} />
                    </div>
                  </div>
                </div>

                <div className="mt-8 px-2">
                  <span className="text-[9px] font-black text-[#388F96] uppercase tracking-[0.3em] mb-2 block">
                    {book.category}
                  </span>
                  <h3 className="text-xl font-black uppercase text-gray-900 tracking-tighter leading-tight group-hover:text-[#72333B] transition-colors mb-3 line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={12} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                      {book.author}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* NO RESULTS STATE */
          <div className="py-40 text-center bg-white rounded-[60px] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <SearchX size={80} className="text-[#72333B] mb-8 opacity-20" />
            <h2 className="text-3xl font-black text-gray-300 uppercase tracking-tighter">
              No Matches Found
            </h2>
            <p className="text-gray-400 text-xs mt-2 uppercase font-bold tracking-widest">
              Try searching for a different title, author or ISBN.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 text-[#388F96] font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Librarycollection;
