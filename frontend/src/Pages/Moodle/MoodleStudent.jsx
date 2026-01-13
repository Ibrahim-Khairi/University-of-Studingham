import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Info,
  Calendar,
  Lock,
  Download,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import DashboardPanel from "../../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../../components/Dashboardcomponents/DashboardSearch";

const MoodleStudent = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(false);

  // activeYear tracks which Tab is currently clicked
  const [activeYear, setActiveYear] = useState(null);

  const BASE_URL = "http://localhost:5000";

  // 1. SYNC LOGIC: Set the default tab to student's current year as soon as user data arrives
  useEffect(() => {
    if (user?.levelOfStudy) {
      setActiveYear(user.levelOfStudy);
    }
  }, [user?.levelOfStudy]);

  // 2. FETCH LOGIC: Runs whenever activeYear or user.courseId changes
  useEffect(() => {
    const fetchContent = async () => {
      // Guard: Don't call API if we don't have the necessary IDs yet
      if (!user?.courseId || !activeYear) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/setup/modules/${user.courseId}/${activeYear}`
        );
        setModules(res.data);
      } catch (err) {
        console.error("Error loading modules:", err);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [user?.courseId, activeYear]);

  // 3. DOWNLOAD LOGIC: Bypasses browser blocks by fetching as a Blob
  const handleDownloadAndOpen = async (fileUrl, fileName) => {
    const fullUrl = `${BASE_URL}${fileUrl}`;

    // Open for preview in new tab
    window.open(fullUrl, "_blank");

    // Trigger physical download
    try {
      const response = await axios({
        url: fullUrl,
        method: "GET",
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Extract extension and set clean filename
      const extension = fileUrl.split(".").pop();
      const cleanFileName = fileName
        ? `${fileName}.${extension}`
        : fileUrl.split("/").pop();

      link.setAttribute("download", cleanFileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download Error:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const allYears = [1, 2, 3];

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />

        <div className="overflow-hidden">
          <DashboardSearch />

          {!selectedModule ? (
            /* --- VIEW 1: MODULE GRID --- */
            <div className="mt-8 p-4">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-[#407008]" size={35} />
                <h1 className="text-3xl font-black uppercase text-gray-800 tracking-tighter">
                  My Learning Path
                </h1>
              </div>

              {/* YEAR TABS (Locked logic included) */}
              <div className="flex gap-4 mb-10">
                {allYears.map((year) => {
                  const isLocked = year > user?.levelOfStudy;
                  const isActive = activeYear === year;
                  const isCurrent = year === user?.levelOfStudy;

                  return (
                    <button
                      key={year}
                      disabled={isLocked}
                      onClick={() => setActiveYear(year)}
                      className={`px-10 py-4 rounded-2xl font-black transition-all duration-300 shadow-md flex items-center gap-3 border-2 relative ${
                        isLocked
                          ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                          : isActive
                          ? "bg-[#407008] text-white border-[#407008] scale-105 shadow-xl"
                          : "bg-white text-[#407008] border-white hover:border-[#407008]/20"
                      }`}
                    >
                      {isLocked ? <Lock size={18} /> : <Calendar size={18} />}
                      Year {year}
                      {isCurrent && (
                        <span className="text-[8px] absolute -top-2 right-2 bg-[#72333B] text-white px-2 py-1 rounded-md shadow-sm">
                          CURRENT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#407008]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {modules.length > 0 ? (
                    modules.map((m) => (
                      <div
                        key={m._id}
                        onClick={() => setSelectedModule(m)}
                        className="bg-white p-10 rounded-[40px] border-l-[15px] border-[#407008] cursor-pointer shadow-sm hover:translate-x-3 transition-all group"
                      >
                        <h2 className="font-black uppercase text-gray-800 text-2xl group-hover:text-[#407008]">
                          {m.name}
                        </h2>
                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-[10px] font-black text-white bg-[#407008] px-3 py-1 rounded-full uppercase">
                            Year {activeYear}
                          </span>
                          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            Click to open curriculum
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-32 text-center bg-white rounded-[40px] border-4 border-dashed border-gray-200">
                      <p className="text-gray-300 font-black text-xl uppercase tracking-widest">
                        No published modules for Year {activeYear}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* --- VIEW 2: 8-WEEK CURRICULUM --- */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-500 mb-8 font-black hover:text-[#72333B] transition-colors uppercase text-xs tracking-widest"
              >
                <ArrowLeft size={20} /> Back to Year {activeYear} Modules
              </button>

              <div className="bg-white p-12 rounded-[60px] shadow-2xl border-t-[20px] border-[#72333B]">
                <div className="flex justify-between items-start border-b border-gray-100 pb-10 mb-14">
                  <div>
                    <h1 className="text-5xl font-black text-gray-800 uppercase tracking-tighter leading-none">
                      {selectedModule.name}
                    </h1>
                    <p className="text-[#407008] font-black uppercase text-sm mt-4 tracking-[0.2em]">
                      Academic Year {activeYear} • Student Content
                    </p>
                  </div>
                </div>

                <div className="space-y-32">
                  {(selectedModule.weeks && selectedModule.weeks.length > 0
                    ? selectedModule.weeks
                    : Array.from({ length: 8 }, (_, i) => ({
                        weekNumber: i + 1,
                      }))
                  ).map((week) => (
                    <div
                      key={week.weekNumber}
                      className="relative pl-16 border-l-8 border-gray-50"
                    >
                      {/* Burgundy Week Badge */}
                      <div className="absolute -left-[36px] top-0 bg-[#72333B] text-white w-16 h-16 rounded-[25px] flex items-center justify-center font-black text-2xl shadow-xl">
                        {week.weekNumber}
                      </div>

                      <h3 className="text-4xl font-black text-gray-800 uppercase tracking-tight mb-8">
                        Week {week.weekNumber} Overview
                      </h3>

                      <div className="bg-gray-50 p-8 rounded-[40px] text-gray-700 font-bold leading-relaxed mb-10 border border-gray-100 shadow-inner">
                        {week.topic ||
                          "Syllabus content for this week has not been uploaded yet."}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials?.map((slot, idx) => (
                          <div
                            key={idx}
                            className="bg-white border-2 border-gray-100 p-8 rounded-[35px] flex flex-col items-center justify-center text-center shadow-sm hover:border-[#407008] transition-all group"
                          >
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                              Resource {idx + 1}
                            </span>
                            <p className="text-xs font-black uppercase text-gray-800 mb-6 h-8 line-clamp-2">
                              {slot.info || "Pending Material"}
                            </p>

                            {slot.fileUrl ? (
                              <button
                                onClick={() =>
                                  handleDownloadAndOpen(slot.fileUrl, slot.info)
                                }
                                className="w-full bg-[#407008] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#2d5006] transition-all shadow-md active:scale-95 cursor-pointer"
                              >
                                <Download size={18} />
                                <span className="text-[10px] font-black uppercase">
                                  Download
                                </span>
                              </button>
                            ) : (
                              <div className="w-full bg-gray-50 text-gray-300 py-4 rounded-2xl flex items-center justify-center gap-2 border border-dashed border-gray-200 cursor-not-allowed">
                                <FileText size={18} />
                                <span className="text-[10px] font-black uppercase">
                                  Locked
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Slate Blue Card */}
                <div className="mt-32 p-10 bg-[#4C86A8]/10 rounded-[45px] flex items-center gap-8 text-[#4C86A8] border-2 border-[#4C86A8]/20">
                  <div className="bg-white p-5 rounded-3xl shadow-sm">
                    <Info size={40} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
                    Note: You are viewing materials for Year {activeYear}. New
                    content is synchronized weekly by your course tutor.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodleStudent;
