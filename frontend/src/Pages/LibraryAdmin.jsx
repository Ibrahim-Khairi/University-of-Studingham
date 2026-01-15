import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  XCircle,
  Upload,
  Save,
  BookOpen,
  Hash,
  User,
  Calendar,
  BookMarked,
  Settings2,
  Inbox,
  CheckCircle,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";

const LibraryAdmin = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("inventory"); // inventory | requests
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Technology",
    subject: "",
    publisher: "",
    publishedDate: "",
    language: "English",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000";

  // --- DATA FETCHING ---
  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/library/collection`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/library/admin/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchRequests();
  }, []);

  // --- HANDLERS ---
  const handleEditClick = (book) => {
    setIsEditing(true);
    setEditId(book._id);
    setForm({ ...book });
    document
      .getElementById("library-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append("cover", image);

    try {
      const url = isEditing
        ? `${BASE_URL}/api/library/update/${editId}`
        : `${BASE_URL}/api/library/add`;
      await axios[isEditing ? "put" : "post"](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(isEditing ? "Book Updated!" : "Book Added!");
      setIsEditing(false);
      setForm({
        title: "",
        author: "",
        isbn: "",
        category: "Technology",
        subject: "",
        publisher: "",
        publishedDate: "",
        language: "English",
      });
      setImage(null);
      fetchInventory();
    } catch (err) {
      alert("Action failed");
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/library/admin/handle-request`,
        { requestId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Request ${action} successfully`);
      fetchRequests();
      fetchInventory();
    } catch (err) {
      alert("Failed to process request");
    }
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />

        <div className="overflow-hidden flex flex-col gap-6">
          <DashboardSearch />

          {/* HEADER & TAB SWITCHER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 px-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#72333B] p-4 rounded-3xl text-white shadow-xl rotate-3">
                <BookMarked size={35} />
              </div>
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-800 leading-none">
                  Library Center
                </h1>
                <p className="text-[#388F96] font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                  Manage Assets & Requests
                </p>
              </div>
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                  activeTab === "inventory"
                    ? "bg-[#72333B] text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                  activeTab === "requests"
                    ? "bg-[#72333B] text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                Requests (
                {requests.filter((r) => r.status === "Pending").length})
              </button>
            </div>
          </div>

          {activeTab === "inventory" ? (
            /* ================= VIEW 1: INVENTORY ================= */
            <>
              <div
                id="library-form"
                className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 mb-4 transition-all"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black uppercase text-gray-800 tracking-tight flex items-center gap-3">
                    <Settings2 className="text-[#388F96]" />
                    {isEditing
                      ? "Modify Catalog Entry"
                      : "Register New Acquisition"}
                  </h2>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AdminInput
                      label="Book Title"
                      value={form.title}
                      onChange={(v) => setForm({ ...form, title: v })}
                      placeholder="e.g. History of AI"
                    />
                    <AdminInput
                      label="Author"
                      value={form.author}
                      onChange={(v) => setForm({ ...form, author: v })}
                      placeholder="Full Name"
                    />
                    <AdminInput
                      label="ISBN Number"
                      value={form.isbn}
                      onChange={(v) => setForm({ ...form, isbn: v })}
                      placeholder="000-00000000"
                    />
                    <AdminInput
                      label="Subject/Topic"
                      value={form.subject}
                      onChange={(v) => setForm({ ...form, subject: v })}
                      placeholder="Category details"
                    />
                    <AdminInput
                      label="Publisher"
                      value={form.publisher}
                      onChange={(v) => setForm({ ...form, publisher: v })}
                      placeholder="e.g. Oxford Press"
                    />
                    <AdminInput
                      label="Publish Date"
                      value={form.publishedDate}
                      onChange={(v) => setForm({ ...form, publishedDate: v })}
                      placeholder="Year/Date"
                    />

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">
                        Book Cover
                      </label>
                      <label className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center cursor-pointer hover:border-[#388F96] group transition-all h-[54px]">
                        <Upload
                          size={18}
                          className="mr-2 text-gray-300 group-hover:text-[#388F96]"
                        />
                        <span className="text-[10px] font-black uppercase text-gray-400 truncate">
                          {image ? image.name : "Attach Image"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </label>
                    </div>

                    <div className="flex items-end h-[54px]">
                      <button
                        type="submit"
                        className="w-full bg-[#22988E] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#1b7a72] transition-all flex items-center justify-center gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Save size={16} /> Save
                          </>
                        ) : (
                          <>
                            <Plus size={16} /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-[50px] shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                  <thead className="bg-white border-b">
                    <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      <th className="p-8">Book</th>
                      <th className="p-8">ISBN</th>
                      <th className="p-8">Status</th>
                      <th className="p-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {books.map((b) => (
                      <tr
                        key={b._id}
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="p-8 flex items-center gap-5">
                          <img
                            src={
                              b.coverImage
                                ? `${BASE_URL}${b.coverImage}`
                                : "/librarycollection.png"
                            }
                            className="w-14 h-20 object-cover rounded-xl shadow-md border-2 border-white"
                            alt="cover"
                          />
                          <div>
                            <p className="font-black text-gray-800 uppercase text-lg tracking-tighter leading-tight">
                              {b.title}
                            </p>
                            <p className="text-[10px] text-[#388F96] font-black uppercase tracking-widest">
                              {b.author}
                            </p>
                          </div>
                        </td>
                        <td className="p-8 font-mono text-xs font-bold text-gray-400 tracking-widest">
                          {b.isbn}
                        </td>
                        <td className="p-8">
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest ${
                              b.status === "Available"
                                ? "text-green-500"
                                : "text-orange-400"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => handleEditClick(b)}
                              className="p-3 bg-blue-50 text-blue-500 rounded-2xl transition-all"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm("Delete?")) {
                                  await axios.delete(
                                    `${BASE_URL}/api/library/book/${b._id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );
                                  fetchInventory();
                                }
                              }}
                              className="p-3 bg-red-50 text-red-400 rounded-2xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* ================= VIEW 2: REQUESTS ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
              {requests
                .filter((r) => r.status === "Pending")
                .map((req) => (
                  <div
                    key={req._id}
                    className="bg-white p-10 rounded-[50px] shadow-sm border-l-[15px] border-[#7A6191] hover:shadow-2xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">
                        Order ID: #{req._id.slice(-4)}
                      </span>
                      <div className="bg-[#7A6191]/10 text-[#7A6191] p-2 rounded-lg flex items-center gap-2">
                        <Clock size={12} />{" "}
                        <span className="text-[9px] font-black">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-black text-gray-800 uppercase tracking-tighter leading-tight mb-2">
                      {req.bookId?.title}
                    </h4>
                    <p className="text-xs font-black text-[#7A6191] uppercase tracking-widest mb-10">
                      {req.studentId?.email}
                    </p>
                    <div className="flex gap-4 pt-6 border-t border-gray-50">
                      <button
                        onClick={() => handleRequestAction(req._id, "Approved")}
                        className="flex-1 bg-[#22988E] text-white py-4 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => handleRequestAction(req._id, "Declined")}
                        className="flex-1 border-2 border-gray-100 text-gray-300 py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                      >
                        <X size={16} /> Decline
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminInput = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 outline-none focus:border-[#388F96] font-bold text-sm transition-all"
    />
  </div>
);

export default LibraryAdmin;
