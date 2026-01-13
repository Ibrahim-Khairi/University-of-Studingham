import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Upload,
  FileText,
  XCircle,
  CheckCircle,
  BookOpen,
  ChevronRight,
  Info,
  Eye,
  EyeOff,
} from "lucide-react";
import DashboardPanel from "../../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../../components/Dashboardcomponents/DashboardSearch";

const MoodleTutor = () => {
  const [allModules, setAllModules] = useState([]);
  const [registeredYear, setRegisteredYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // --- 8-WEEK STATE ---
  const [weekData, setWeekData] = useState([]);

  const token = localStorage.getItem("accessToken");

  // Fetch Assigned Modules on Mount
  useEffect(() => {
    fetchModules();
  }, []);

  // Initialize/Load Curriculum when a Module is selected
  useEffect(() => {
    if (selectedModule) {
      if (selectedModule.weeks && selectedModule.weeks.length > 0) {
        setWeekData(selectedModule.weeks);
      } else {
        const skeleton = Array.from({ length: 8 }, (_, i) => ({
          weekNumber: i + 1,
          topic: "",
          materials: [
            { info: "", fileUrl: "" },
            { info: "", fileUrl: "" },
            { info: "", fileUrl: "" },
          ],
        }));
        setWeekData(skeleton);
      }
    }
  }, [selectedModule]);

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tutors/my-modules",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllModules(response.data.modules);
      setRegisteredYear(response.data.registeredYear);
    } catch (err) {
      console.error("Failed to load tutor modules");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: TOGGLE VISIBILITY ---
  const toggleModuleVisibility = async (e, moduleId) => {
    e.stopPropagation(); // Prevent opening the editor when clicking toggle
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/modules/${moduleId}/visibility`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local list
      setAllModules((prev) =>
        prev.map((m) =>
          m._id === moduleId ? { ...m, isVisible: res.data.isVisible } : m
        )
      );

      // Update the selected module state if we are currently editing it
      if (selectedModule?._id === moduleId) {
        setSelectedModule((prev) => ({
          ...prev,
          isVisible: res.data.isVisible,
        }));
      }
    } catch (error) {
      alert("Failed to update visibility");
    }
  };

  // --- Handlers ---
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

  const handleMaterialFileChange = (weekIdx, slotIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...weekData];
      updated[weekIdx].materials[slotIdx].file = file;
      setWeekData(updated);
    }
  };

  const removeMaterial = (weekIdx, slotIdx) => {
    const updated = [...weekData];
    updated[weekIdx].materials[slotIdx] = { info: "", fileUrl: "", file: null };
    setWeekData(updated);
  };

  const handleSaveCurriculum = async () => {
    setIsSaving(true);
    const formData = new FormData();

    const sanitizedWeeks = weekData.map((week) => ({
      weekNumber: week.weekNumber,
      topic: week.topic,
      materials: week.materials.map((m) => ({
        info: m.info,
        fileUrl: m.fileUrl,
      })),
    }));
    formData.append("weeks", JSON.stringify(sanitizedWeeks));

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
      alert("Successfully Published to Students!");
      fetchModules();
      setSelectedModule(null);
    } catch (error) {
      console.error(error);
      alert("Failed to publish content.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />

        <div className="overflow-hidden">
          <DashboardSearch />

          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#72333B]"></div>
            </div>
          ) : !selectedModule ? (
            /* --- MODULE SELECTION --- */
            <div className="mt-8 p-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#72333B] p-4 rounded-3xl text-white shadow-lg rotate-3">
                  <BookOpen size={30} />
                </div>
                <h1 className="text-4xl font-black uppercase text-gray-800 tracking-tighter">
                  My Assigned Modules
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allModules.map((mod) => (
                  <div
                    key={mod._id}
                    onClick={() => setSelectedModule(mod)}
                    className={`bg-white p-10 rounded-[40px] border-l-[15px] shadow-sm hover:shadow-xl hover:translate-y-[-5px] cursor-pointer transition-all flex justify-between items-center group ${
                      mod.isVisible ? "border-[#407008]" : "border-gray-300"
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl font-black uppercase group-hover:text-[#72333B]">
                        {mod.name}
                      </h2>
                      <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-widest">
                        Year {mod.year || registeredYear} Core Module
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            mod.isVisible
                              ? "bg-[#407008] animate-pulse"
                              : "bg-gray-300"
                          }`}
                        />
                        <span className="text-[9px] font-black uppercase text-gray-400">
                          {mod.isVisible
                            ? "Live for Students"
                            : "Hidden / Locked"}
                        </span>
                      </div>
                    </div>

                    {/* VISIBILITY TOGGLE IN LIST */}
                    <button
                      onClick={(e) => toggleModuleVisibility(e, mod._id)}
                      className={`p-4 rounded-2xl transition-all shadow-sm active:scale-90 ${
                        mod.isVisible
                          ? "bg-[#407008] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {mod.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* --- 8-WEEK PROFESSIONAL EDITOR --- */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#72333B] font-black uppercase text-xs"
                >
                  <ArrowLeft size={16} /> Back to Modules
                </button>

                {/* VISIBILITY TOGGLE IN EDITOR */}
                <button
                  onClick={(e) => toggleModuleVisibility(e, selectedModule._id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all shadow-md active:scale-95 ${
                    selectedModule.isVisible
                      ? "bg-[#407008] text-white"
                      : "bg-white text-gray-400 border-2 border-gray-100"
                  }`}
                >
                  {selectedModule.isVisible ? (
                    <>
                      <Eye size={16} /> Visible to Students
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} /> Module Hidden
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white p-12 rounded-[60px] shadow-2xl border-t-[20px] border-[#72333B]">
                <div className="border-b border-gray-100 pb-10 mb-16 flex justify-between items-center">
                  <div>
                    <h1 className="text-5xl font-black text-gray-800 uppercase tracking-tighter leading-tight">
                      {selectedModule.name}
                    </h1>
                    <p className="text-[#407008] font-black uppercase text-sm mt-3 tracking-widest">
                      Update 8-Week Student Curriculum
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
                      Tutor Access
                    </span>
                  </div>
                </div>

                <div className="space-y-32">
                  {weekData.map((week, weekIdx) => (
                    <div
                      key={week.weekNumber}
                      className="relative pl-16 border-l-8 border-gray-50"
                    >
                      <div className="absolute -left-9 top-0 bg-[#72333B] text-white w-16 h-16 rounded-[25px] flex items-center justify-center font-black text-2xl shadow-xl">
                        {week.weekNumber}
                      </div>

                      <div className="mb-10">
                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-3">
                          Weekly Learning Objective
                        </label>
                        <textarea
                          value={week.topic}
                          onChange={(e) =>
                            handleTopicChange(weekIdx, e.target.value)
                          }
                          placeholder="What will students learn this week?"
                          className="w-full p-8 border-2 border-gray-100 rounded-[35px] focus:border-[#72333B] outline-none bg-gray-50/50 h-32 resize-none transition-all font-bold text-gray-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials.map((slot, slotIdx) => (
                          <div
                            key={slotIdx}
                            className="bg-white border-2 border-gray-50 p-6 rounded-[35px] hover:border-[#407008] transition-all"
                          >
                            <input
                              type="text"
                              value={slot.info}
                              onChange={(e) =>
                                handleMaterialInfoChange(
                                  weekIdx,
                                  slotIdx,
                                  e.target.value
                                )
                              }
                              placeholder="Title (e.g. Week 1 PDF)"
                              className="w-full text-[10px] font-black uppercase p-2 border-b border-gray-50 outline-none focus:border-[#407008] mb-4"
                            />

                            {slot.file || slot.fileUrl ? (
                              <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <FileText
                                    size={20}
                                    className="text-[#407008]"
                                  />
                                  <span className="text-[9px] font-black text-[#407008] truncate">
                                    {slot.file
                                      ? slot.file.name
                                      : "Saved Document"}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    removeMaterial(weekIdx, slotIdx)
                                  }
                                >
                                  <XCircle size={18} className="text-red-400" />
                                </button>
                              </div>
                            ) : (
                              <label className="border-4 border-dashed border-gray-50 rounded-2xl py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group">
                                <Upload
                                  className="text-gray-200 group-hover:text-[#407008]"
                                  size={24}
                                />
                                <span className="text-[9px] font-black text-gray-300 mt-2 uppercase">
                                  Attach File
                                </span>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleMaterialFileChange(
                                      weekIdx,
                                      slotIdx,
                                      e
                                    )
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
                    disabled={isSaving}
                    onClick={handleSaveCurriculum}
                    className="w-full bg-[#407008] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:bg-[#2d5006] transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
                  >
                    {isSaving ? (
                      "SYNCING TO PORTAL..."
                    ) : (
                      <>
                        <CheckCircle size={35} /> PUBLISH CONTENT
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

export default MoodleTutor;
