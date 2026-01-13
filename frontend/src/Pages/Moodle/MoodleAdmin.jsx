import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  ShieldCheck,
  Search,
  CheckCircle,
  BookOpen,
  Calendar,
  UserCheck,
  UserX,
  Upload,
  FileText,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  Activity,
  ChevronRight,
} from "lucide-react";
import DashboardPanel from "../../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../../components/Dashboardcomponents/DashboardSearch";

const MoodleAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // --- 8-WEEK STATE ---
  const [weekData, setWeekData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCourses();
  }, []);

  // Initialize week data when a module is selected
  useEffect(() => {
    if (selectedModule) {
      // If module already has weeks in DB, use them, otherwise create empty 8 weeks
      if (selectedModule.weeks && selectedModule.weeks.length > 0) {
        setWeekData(selectedModule.weeks);
      } else {
        const emptyWeeks = Array.from({ length: 8 }, (_, i) => ({
          weekNumber: i + 1,
          topic: "",
          materials: [
            { info: "", fileUrl: "" },
            { info: "", fileUrl: "" },
            { info: "", fileUrl: "" },
          ],
        }));
        setWeekData(emptyWeeks);
      }
    }
  }, [selectedModule]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/setup/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Fetch Courses Error:", error);
    }
  };

  const handleCourseSelect = async (course) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/modules/course/${course._id}`
      );
      setModules(res.data);
      setSelectedCourse(course);
    } catch (error) {
      console.error("Fetch Modules Error:", error);
    }
  };

  // --- API: TOGGLE VISIBILITY ---
  const toggleModuleVisibility = async (moduleId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.patch(
        `http://localhost:5000/api/modules/${moduleId}/visibility`,
        {}, // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check the console to see what the backend returned
      console.log("Server returned isVisible:", res.data.isVisible);

      // Update the state using the value directly from the server
      setModules((prev) =>
        prev.map((m) =>
          m._id === moduleId ? { ...m, isVisible: res.data.isVisible } : m
        )
      );
    } catch (error) {
      console.error("Visibility update failed:", error);
      alert("Failed to update visibility. Check console for details.");
    }
  };
  // --- HANDLERS FOR EDITOR ---
  const handleTopicChange = (weekIdx, value) => {
    const updated = [...weekData];
    updated[weekIdx].topic = value;
    setWeekData(updated);
  };

  const handleMaterialInfoChange = (weekIdx, slotIdx, value) => {
    const updated = [...weekData];
    updated[weekIdx].materials[slotIdx].info = value;
    setWeekData(updated);
  };

  const handleFileChange = (weekIdx, slotIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...weekData];
      // Store the file object locally for upload
      updated[weekIdx].materials[slotIdx].file = file;
      setWeekData(updated);
    }
  };

  // --- API: SAVE CURRICULUM ---
  const handleSaveCurriculum = async () => {
    setIsSaving(true);
    const formData = new FormData();

    // 1. Prepare JSON data (topics and info text)
    // We remove the file objects from the JSON before stringifying
    const sanitizedWeeks = weekData.map((week) => ({
      ...week,
      materials: week.materials.map((m) => ({
        info: m.info,
        fileUrl: m.fileUrl,
      })),
    }));
    formData.append("weeks", JSON.stringify(sanitizedWeeks));

    // 2. Append actual files with specific naming convention
    weekData.forEach((week) => {
      week.materials.forEach((slot, slotIdx) => {
        if (slot.file) {
          formData.append(
            `file_week_${week.weekNumber}_slot_${slotIdx}`,
            slot.file
          );
        }
      });
    });

    try {
      await axios.post(
        `http://localhost:5000/api/modules/${selectedModule._id}/curriculum`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Module Curriculum Published Successfully!");
      setSelectedModule(null);
    } catch (error) {
      console.error(error);
      alert("Error saving curriculum");
    } finally {
      setIsSaving(false);
    }
  };

  const renderYearSection = (yearNumber) => {
    const filteredModules = modules.filter((m) => m.year === yearNumber);
    if (filteredModules.length === 0) return null;

    return (
      <div key={yearNumber} className="mb-14">
        <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#72333B] p-2 rounded-lg text-white">
              <Calendar size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase text-gray-800">
              Academic Year {yearNumber}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModules.map((m) => (
            <div
              key={m._id}
              className={`bg-white rounded-[35px] shadow-sm border-2 transition-all ${
                m.isVisible
                  ? "border-[#407008]/20"
                  : "border-gray-100 opacity-80"
              }`}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="font-black uppercase text-gray-800 text-xl mb-2">
                      {m.name}
                    </h3>
                    <span
                      className={`text-[9px] font-black uppercase ${
                        m.tutorId ? "text-blue-500" : "text-amber-500"
                      }`}
                    >
                      {m.tutorId ? "Tutor Assigned" : "Awaiting Tutor"}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleModuleVisibility(m._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all font-black text-[10px] uppercase shadow-sm ${
                      m.isVisible
                        ? "bg-[#407008] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {m.isVisible ? (
                      <>
                        <Eye size={14} /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff size={14} /> Hidden
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        m.isVisible
                          ? "bg-[#407008] animate-pulse"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      Status: {m.isVisible ? "Active" : "Locked"}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedModule(m)}
                    className="bg-gray-800 text-white p-3 rounded-xl hover:bg-[#72333B] transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />
        <div className="overflow-hidden">
          <DashboardSearch />

          {!selectedCourse ? (
            /* --- STEP 1: COURSE SELECT --- */
            <div className="mt-8 p-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#72333B] p-4 rounded-3xl text-white shadow-xl rotate-3">
                  <ShieldCheck size={35} />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-800">
                  Management Console
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => handleCourseSelect(c)}
                    className="bg-white p-10 rounded-[40px] border-b-[12px] border-[#72333B] cursor-pointer shadow-md hover:translate-y-[-8px] transition-all text-center"
                  >
                    <BookOpen
                      size={40}
                      className="text-[#72333B] mx-auto mb-4"
                    />
                    <h2 className="font-black uppercase text-gray-800 text-xl">
                      {c.name}
                    </h2>
                    <p className="text-gray-400 text-[10px] font-black mt-2">
                      {c.code}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : !selectedModule ? (
            /* --- STEP 2: YEAR VIEW --- */
            <div className="mt-8 p-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="mb-8 text-gray-400 font-black flex items-center gap-2 hover:text-[#72333B] transition-colors uppercase text-xs"
              >
                <ArrowLeft size={16} /> Back to Courses
              </button>
              <h1 className="text-5xl font-black mb-12 uppercase text-gray-800 tracking-tighter">
                {selectedCourse.name}
              </h1>
              {[1, 2, 3].map((year) => renderYearSection(year))}
            </div>
          ) : (
            /* --- STEP 3: 8-WEEK EDITOR --- */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-400 mb-8 font-black uppercase text-xs hover:text-[#72333B]"
              >
                <ArrowLeft size={20} /> Back to Year View
              </button>

              <div className="bg-white p-12 rounded-[60px] shadow-2xl border-t-[20px] border-[#72333B]">
                <div className="border-b border-gray-100 pb-10 mb-14">
                  <h1 className="text-5xl font-black text-gray-800 uppercase tracking-tighter">
                    {selectedModule.name}
                  </h1>
                  <p className="text-[#407008] font-black uppercase text-sm mt-4 tracking-widest">
                    Year {selectedModule.year} Curriculum Editor
                  </p>
                </div>

                <div className="space-y-32">
                  {weekData.map((week, weekIdx) => (
                    <div
                      key={week.weekNumber}
                      className="relative pl-16 border-l-8 border-gray-50"
                    >
                      <div className="absolute -left-9 top-0 bg-[#72333B] text-white w-16 h-16 rounded-[25px] flex items-center justify-center font-black text-2xl shadow-2xl">
                        {week.weekNumber}
                      </div>

                      <div className="mb-8">
                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-3">
                          Weekly Learning Topic
                        </label>
                        <textarea
                          value={week.topic}
                          onChange={(e) =>
                            handleTopicChange(weekIdx, e.target.value)
                          }
                          className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[30px] outline-none focus:border-[#72333B] font-bold text-gray-700 h-28 resize-none transition-all"
                          placeholder="Describe this week's content..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials.map((slot, slotIdx) => (
                          <div
                            key={slotIdx}
                            className="bg-white border-2 border-gray-100 p-6 rounded-[35px] hover:border-[#407008] transition-all"
                          >
                            <input
                              type="text"
                              placeholder="Material Name (e.g. Slides)"
                              value={slot.info}
                              onChange={(e) =>
                                handleMaterialInfoChange(
                                  weekIdx,
                                  slotIdx,
                                  e.target.value
                                )
                              }
                              className="w-full text-[10px] font-black uppercase border-b border-gray-100 pb-2 mb-4 outline-none focus:border-[#407008]"
                            />

                            {slot.file || slot.fileUrl ? (
                              <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <FileText
                                    size={18}
                                    className="text-[#407008]"
                                  />
                                  <span className="text-[9px] font-black text-[#407008] truncate">
                                    {slot.file ? slot.file.name : "Stored File"}
                                  </span>
                                </div>
                                <button
                                  onClick={() => {
                                    const updated = [...weekData];
                                    updated[weekIdx].materials[slotIdx] = {
                                      info: "",
                                      fileUrl: "",
                                    };
                                    setWeekData(updated);
                                  }}
                                >
                                  <XCircle size={16} className="text-red-400" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 group">
                                <Upload
                                  size={20}
                                  className="text-gray-300 group-hover:text-[#407008]"
                                />
                                <span className="text-[8px] font-black text-gray-400 uppercase mt-2">
                                  Upload File
                                </span>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(weekIdx, slotIdx, e)
                                  }
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-32 pt-16 border-t-8 border-gray-50">
                  <button
                    onClick={handleSaveCurriculum}
                    disabled={isSaving}
                    className="w-full bg-[#407008] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:bg-[#2d5006] transition-all flex items-center justify-center gap-6"
                  >
                    {isSaving ? (
                      "SYNCING TO DATABASE..."
                    ) : (
                      <>
                        <CheckCircle size={35} /> PUBLISH UPDATES
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodleAdmin;
