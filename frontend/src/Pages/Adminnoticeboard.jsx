import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import {
  Megaphone,
  Plus,
  Trash2,
  Users,
  Clock,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

const AdminNoticeboard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    target: "all",
    priority: "normal",
  });

  const BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("accessToken");

  // 1. Load notices from Backend
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/notices/admin-view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 2. Count Logic (Synchronized with Backend rules)
  const studentCount = notices.filter(
    (n) => n.target === "student" || n.target === "all"
  ).length;
  const tutorCount = notices.filter(
    (n) => n.target === "tutor" || n.target === "all"
  ).length;

  const priorityColors = {
    urgent: "border-[#8E3B46] text-[#8E3B46] bg-[#8E3B46]/5",
    normal: "border-[#4C86A8] text-[#4C86A8] bg-[#4C86A8]/5",
    social: "border-[#407008] text-[#407008] bg-[#407008]/5",
  };

  // 3. Handle Add Notice (API call)
  const handleAddNotice = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/notices`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ title: "", content: "", target: "all", priority: "normal" });
      fetchNotices(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to publish notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle Delete Notice (API call)
  const deleteNotice = async (id) => {
    if (!window.confirm("Remove this broadcast?")) return;
    try {
      await axios.delete(`${BASE_URL}/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotices();
    } catch (err) {
      alert("Failed to delete notice");
    }
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <div className="h-fit sticky top-5">
          <DashboardPanel />
        </div>

        <div className="flex flex-col gap-5">
          <DashboardSearch />

          {/* CAPACITY MONITOR */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
            <div className="bg-white rounded-[40px] p-8 shadow-sm flex items-center gap-5">
              <div className="bg-black p-4 rounded-3xl text-white">
                <Megaphone size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">
                  Noticeboard Admin
                </h1>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  Live Broadcast Management (Limit: 3)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase text-gray-400">
                  Student Board
                </span>
                <span
                  className={`text-[12px] font-black ${
                    studentCount >= 3 ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {studentCount}/3
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(studentCount / 3) * 100}%` }}
                  className={`h-full transition-all ${
                    studentCount >= 3 ? "bg-red-500" : "bg-[#4C86A8]"
                  }`}
                />
              </div>
              <div className="flex justify-between items-center mt-4 mb-2">
                <span className="text-[10px] font-black uppercase text-gray-400">
                  Tutor Board
                </span>
                <span
                  className={`text-[12px] font-black ${
                    tutorCount >= 3 ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {tutorCount}/3
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(tutorCount / 3) * 100}%` }}
                  className={`h-full transition-all ${
                    tutorCount >= 3 ? "bg-red-500" : "bg-[#72333B]"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.8fr] gap-6">
            {/* LEFT: FORM */}
            <div className="bg-white rounded-[45px] p-8 shadow-sm h-fit">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#407008]" /> Draft New Notice
              </h3>
              <form onSubmit={handleAddNotice} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-gray-50 rounded-2xl px-5 py-4 outline-none font-bold text-sm border-2 border-transparent focus:border-black transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
                    Broadcast Content
                  </label>
                  <textarea
                    required
                    value={form.content}
                    rows="4"
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    className="w-full bg-gray-50 rounded-2xl px-5 py-4 outline-none font-bold text-sm border-2 border-transparent focus:border-black transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
                      Audience
                    </label>
                    <select
                      value={form.target}
                      onChange={(e) =>
                        setForm({ ...form, target: e.target.value })
                      }
                      className="w-full bg-gray-50 rounded-2xl px-4 py-3 outline-none font-bold text-xs"
                    >
                      <option value="all">Everyone</option>
                      <option value="student">Students Only</option>
                      <option value="tutor">Tutors Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
                      Priority
                    </label>
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })
                      }
                      className="w-full bg-gray-50 rounded-2xl px-4 py-3 outline-none font-bold text-xs"
                    >
                      <option value="normal">Normal (Blue)</option>
                      <option value="urgent">Urgent (Red)</option>
                      <option value="social">Social (Green)</option>
                    </select>
                  </div>
                </div>

                {((form.target === "student" && studentCount >= 3) ||
                  (form.target === "tutor" && tutorCount >= 3) ||
                  (form.target === "all" &&
                    (studentCount >= 3 || tutorCount >= 3))) && (
                  <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-700 rounded-2xl">
                    <AlertCircle size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      Board limit reached.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (form.target === "student" && studentCount >= 3) ||
                    (form.target === "tutor" && tutorCount >= 3)
                  }
                  className="w-full bg-black text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs mt-4 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-xl active:scale-95"
                >
                  {isSubmitting ? "Syncing..." : "Publish Notice"}
                </button>
              </form>
            </div>

            {/* RIGHT: LIST */}
            <div className="space-y-4">
              <div className="bg-white rounded-[40px] p-8 shadow-sm flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tighter">
                  Active Broadcasts
                </h3>
                <button
                  onClick={fetchNotices}
                  className="text-gray-300 hover:text-black transition-colors"
                >
                  <RefreshCcw size={18} />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-20 text-gray-300 font-black uppercase tracking-widest animate-pulse">
                  Fetching Cloud Data...
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {notices.map((notice) => (
                    <div
                      key={notice._id}
                      className="bg-white p-6 rounded-[35px] shadow-sm border border-transparent hover:border-gray-100 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`px-4 py-1.5 rounded-full border-2 text-[9px] font-black uppercase tracking-widest ${
                            priorityColors[notice.priority]
                          }`}
                        >
                          {notice.priority}
                        </div>
                        <button
                          onClick={() => deleteNotice(notice._id)}
                          className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <h4 className="text-lg font-black uppercase text-gray-800 mb-2">
                        {notice.title}
                      </h4>
                      <p className="text-gray-400 text-sm font-bold mb-6">
                        {notice.content}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-400 font-black uppercase text-[10px]">
                          <Users size={14} /> To: {notice.target}
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 font-black text-[10px]">
                          <Clock size={14} />{" "}
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {notices.length === 0 && (
                    <div className="p-20 text-center text-gray-300 font-bold uppercase italic">
                      No active notices
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNoticeboard;
