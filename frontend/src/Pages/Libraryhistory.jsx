import React, { useState, useEffect } from "react";
import axios from "axios";
import Librarynav from "../components/librarycomponents/Librarynav";
import Bookschart from "../components/librarycomponents/Bookschart";
import Footer from "../components/homecomponents/Footer";
import {
  Clock,
  CheckCircle,
  RotateCcw,
  AlertCircle,
  History,
  BookMarked,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

const Libraryhistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("Approved");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000";

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/library/my-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleReturn = async (requestId) => {
    if (!window.confirm("Confirm return of this item to the archive?")) return;
    try {
      await axios.patch(
        `${BASE_URL}/api/library/return-book`,
        { requestId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Transaction complete. Thank you for returning the material.");
      fetchHistory();
    } catch (err) {
      alert("Return failed. Contact library support.");
    }
  };

  // Dynamic Statistics
  const stats = {
    borrowed: history.filter((h) => h.status === "Approved").length,
    returned: history.filter((h) => h.status === "Returned").length,
    pending: history.filter((h) => h.status === "Pending").length,
    total: history.length,
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase text-gray-300 animate-pulse tracking-widest">
        Scanning History...
      </div>
    );

  return (
    <div className="bg-[#F7F7F8] min-h-screen font-[Century Gothic]">
      <Librarynav />

      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 pt-10 flex justify-between items-end border-b border-gray-200 pb-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-[#72333B] p-4 rounded-3xl text-white shadow-xl rotate-3">
            <History size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-800 leading-none">
              Personal History
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
              Manage your active loans and requests
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <StatusBtn
            label="Borrowed"
            count={stats.borrowed}
            color="#5C7AEA"
            active={filter === "Approved"}
            onClick={() => setFilter("Approved")}
          />
          <StatusBtn
            label="Returned"
            count={stats.returned}
            color="#22988E"
            active={filter === "Returned"}
            onClick={() => setFilter("Returned")}
          />
          <StatusBtn
            label="Requested"
            count={stats.pending}
            color="#7A6191"
            active={filter === "Pending"}
            onClick={() => setFilter("Pending")}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12">
          {/* MAIN LIST AREA */}
          <div className="space-y-8">
            {history.filter((h) => h.status === filter).length > 0 ? (
              history
                .filter((h) => h.status === filter)
                .map((item) => {
                  // Overdue Logic: Check if current date > item.dueDate
                  const isOverdue =
                    item.status === "Approved" &&
                    item.dueDate &&
                    new Date(item.dueDate) < new Date();

                  return (
                    <div
                      key={item._id}
                      className={`bg-white p-10 rounded-[50px] shadow-sm border-2 transition-all duration-500 group flex flex-col md:flex-row justify-between items-center gap-8 ${
                        isOverdue
                          ? "border-red-500 shadow-red-50"
                          : "border-transparent hover:border-[#72333B]/10"
                      }`}
                    >
                      <div className="flex gap-10 items-center flex-1">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              item.bookId?.coverImage
                                ? `${BASE_URL}${item.bookId.coverImage}`
                                : "/librarycollection.png"
                            }
                            className="h-44 w-32 object-cover rounded-[25px] shadow-2xl border-4 border-white group-hover:scale-105 transition-transform"
                            alt="book"
                          />
                          {isOverdue && (
                            <div className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full animate-bounce shadow-lg">
                              <ShieldAlert size={20} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-3xl text-gray-800 uppercase tracking-tighter leading-tight mb-2 group-hover:text-[#72333B] transition-colors">
                            {item.bookId?.title}
                          </h3>
                          <p className="text-[#388F96] font-black uppercase text-[10px] tracking-widest mb-6 italic opacity-70">
                            By {item.bookId?.author}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                                Transaction Date
                              </p>
                              <p className="text-xs font-black text-gray-500 uppercase">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            {item.dueDate && (
                              <div className="space-y-1">
                                <p
                                  className={`text-[9px] font-black uppercase tracking-widest ${
                                    isOverdue ? "text-red-400" : "text-gray-300"
                                  }`}
                                >
                                  Deadline
                                </p>
                                <p
                                  className={`text-xs font-black uppercase ${
                                    isOverdue ? "text-red-600" : "text-gray-500"
                                  }`}
                                >
                                  {new Date(item.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        {isOverdue && (
                          <span className="text-[10px] font-black text-red-600 uppercase animate-pulse">
                            Fine Applied
                          </span>
                        )}
                        {filter === "Approved" && (
                          <button
                            onClick={() => handleReturn(item._id)}
                            className={`px-12 py-5 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center gap-2 ${
                              isOverdue
                                ? "bg-red-600 text-white shadow-red-200"
                                : "bg-[#72333B] text-white hover:bg-gray-800"
                            }`}
                          >
                            <RotateCcw size={16} /> Return Material
                          </button>
                        )}
                        {filter === "Pending" && (
                          <span className="bg-gray-100 text-gray-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            Awaiting Admin
                          </span>
                        )}
                        {filter === "Returned" && (
                          <div className="bg-green-50 text-green-600 p-4 rounded-2xl">
                            <CheckCircle size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="py-32 text-center bg-white rounded-[60px] border-4 border-dashed border-gray-100">
                <BookMarked size={60} className="mx-auto text-gray-100 mb-6" />
                <p className="text-gray-300 font-black text-xl uppercase tracking-tighter">
                  No records found for "{filter}"
                </p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            {/* OVERVIEW CARD */}
            <div className="bg-[#202E48] text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={150} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-12 border-b border-white/10 pb-4">
                Activity Insights
              </h3>
              <div className="flex flex-col items-center relative z-10">
                <Bookschart stats={stats} />
                <div className="w-full mt-16 space-y-6">
                  <LegendItem
                    color="#D75CEA"
                    label="Total Interactions"
                    value={stats.total}
                  />
                  <LegendItem
                    color="#5C7AEA"
                    label="Currently Borrowed"
                    value={stats.borrowed}
                  />
                  <LegendItem
                    color="#F6D047"
                    label="Pending Approval"
                    value={stats.pending}
                  />
                  <LegendItem
                    color="#22988E"
                    label="Returned Successfully"
                    value={stats.returned}
                  />
                </div>
              </div>
            </div>

            {/* POLICY BOX */}
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-[#AD5B54]" size={20} />
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter leading-none">
                  University Policy
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider opacity-80">
                Loan periods are strictly 14 days. Failure to return materials
                on time results in a daily penalty of £1.50. Borrowing
                privileges are revoked for overdue accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatusBtn = ({ label, count, color, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: active ? color : "transparent",
      color: active ? "white" : "#9ca3af",
      borderColor: active ? color : "#e5e7eb",
    }}
    className="px-10 py-5 rounded-[25px] font-black uppercase text-[10px] tracking-widest shadow-sm transition-all active:scale-95 border-2 border-transparent"
  >
    {label} <span className="opacity-40 ml-1 font-bold">[{count}]</span>
  </button>
);

const LegendItem = ({ color, label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-3">
    <div className="flex items-center gap-4">
      <div
        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px] shadow-current"
        style={{ backgroundColor: color, color: color }}
      />
      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
        {label}
      </span>
    </div>
    <span className="font-black text-sm">{value}</span>
  </div>
);

export default Libraryhistory;
