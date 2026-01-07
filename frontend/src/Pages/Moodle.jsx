import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Upload,
  FileText,
  XCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";

const Moodle = () => {
  const [allModules, setAllModules] = useState([]);
  const [registeredYear, setRegisteredYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);

  // Each week has a topic and 3 material slots.
  // Each slot has 'info' (string) and 'file' (actual file object)
  const [weekData, setWeekData] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      topic: "",
      materials: [
        { info: "", file: null },
        { info: "", file: null },
        { info: "", file: null },
      ],
    }))
  );

  useEffect(() => {
    const fetchModules = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tutors/my-modules",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllModules(response.data.modules);
        setRegisteredYear(response.data.registeredYear);
      } catch (err) {
        console.error("Failed to load modules");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  // Update General Topic
  const handleTopicChange = (weekIdx, value) => {
    const updatedWeeks = [...weekData];
    updatedWeeks[weekIdx].topic = value;
    setWeekData(updatedWeeks);
  };

  // Update the Info String for a specific file slot
  const handleMaterialInfoChange = (weekIdx, slotIdx, value) => {
    const updatedWeeks = [...weekData];
    updatedWeeks[weekIdx].materials[slotIdx].info = value;
    setWeekData(updatedWeeks);
  };

  // Update the actual File for a specific slot
  const handleMaterialFileChange = (weekIdx, slotIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedWeeks = [...weekData];
      updatedWeeks[weekIdx].materials[slotIdx].file = file;
      setWeekData(updatedWeeks);
    }
  };

  const removeMaterial = (weekIdx, slotIdx) => {
    const updatedWeeks = [...weekData];
    updatedWeeks[weekIdx].materials[slotIdx] = { info: "", file: null };
    setWeekData(updatedWeeks);
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <div>
          <DashboardPanel />
        </div>

        <div className="overflow-hidden">
          <DashboardSearch />

          {!selectedModule ? (
            /* --- MODULE LIST VIEW --- */
            <div className="mt-8 p-4">
              <h1 className="text-xl font-bold mb-4">
                Select a module to manage:
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allModules.map((mod) => (
                  <div
                    key={mod._id}
                    onClick={() => setSelectedModule(mod)}
                    className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    <h2 className="text-xl font-bold uppercase">{mod.name}</h2>
                    <p className="text-gray-400 text-xs mt-1 uppercase">
                      Level {registeredYear} Module
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* --- WEEKLY CONTENT EDITOR VIEW --- */
            <div className="mt-5 max-w-6xl mx-auto pb-20">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#72333B] mb-6 font-bold transition-colors"
              >
                <ArrowLeft size={20} /> Back to Modules
              </button>

              <div className="bg-white p-8 rounded-3xl shadow-md">
                <div className="border-b pb-4 mb-8">
                  <h1 className="text-3xl font-black text-[#72333B] uppercase">
                    {selectedModule.name}
                  </h1>
                  <p className="text-gray-500">
                    Upload documents and provide descriptions for each week
                  </p>
                </div>

                <div className="space-y-16">
                  {weekData.map((week, weekIdx) => (
                    <div key={week.weekNumber} className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#72333B] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                          {week.weekNumber}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Week {week.weekNumber}
                        </h3>
                      </div>

                      <div className="space-y-8 pl-4 border-l-2 border-gray-100">
                        {/* 1. Week Overview Topic */}
                        <div>
                          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Weekly Overview
                          </label>
                          <textarea
                            value={week.topic}
                            onChange={(e) =>
                              handleTopicChange(weekIdx, e.target.value)
                            }
                            placeholder="Describe what will be covered this week..."
                            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#72333B] outline-none bg-gray-50 h-24 resize-none transition-all"
                          />
                        </div>

                        {/* 2. Three Materials Slots */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {week.materials.map((item, slotIdx) => (
                            <div
                              key={slotIdx}
                              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3"
                            >
                              <span className="text-[10px] font-black text-gray-300 uppercase">
                                Material Slot {slotIdx + 1}
                              </span>

                              {/* String Input for File Description */}
                              <input
                                type="text"
                                value={item.info}
                                onChange={(e) =>
                                  handleMaterialInfoChange(
                                    weekIdx,
                                    slotIdx,
                                    e.target.value
                                  )
                                }
                                placeholder="File Description (e.g. Slides)"
                                className="w-full text-xs p-2 border-b border-gray-100 focus:border-blue-400 outline-none font-medium"
                              />

                              {item.file ? (
                                /* File Uploaded State */
                                <div className="bg-blue-50 rounded-xl p-3 flex items-center justify-between group">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText
                                      size={18}
                                      className="text-blue-500"
                                    />
                                    <span className="text-[10px] font-bold text-blue-800 truncate">
                                      {item.file.name}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeMaterial(weekIdx, slotIdx)
                                    }
                                  >
                                    <XCircle
                                      size={16}
                                      className="text-red-400 hover:text-red-600"
                                    />
                                  </button>
                                </div>
                              ) : (
                                /* Empty Upload State */
                                <label className="border-2 border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group">
                                  <Upload
                                    className="text-gray-300 group-hover:text-[#72333B]"
                                    size={20}
                                  />
                                  <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                                    Upload Document
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
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="mt-20 border-t pt-10">
                  <button className="w-full bg-[#72333B] text-white py-5 rounded-3xl font-bold text-xl hover:bg-[#5a282e] transition-all shadow-2xl flex items-center justify-center gap-3">
                    <CheckCircle size={24} />
                    Save 8-Week Curriculum
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

export default Moodle;
