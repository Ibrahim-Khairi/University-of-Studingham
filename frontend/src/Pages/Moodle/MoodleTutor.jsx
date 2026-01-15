import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  CheckCircle,
  PlusCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Upload,
  FileText,
  XCircle,
  Trash2,
} from "lucide-react";
import DashboardPanel from "../../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../../components/Dashboardcomponents/DashboardSearch";

const MoodleTutor = () => {
  const [allModules, setAllModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000/api/modules";

  // 1. Fetch only modules assigned to THIS tutor
  const fetchMyModules = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/tutors/my-modules",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Handle the data structure returned by your backend
      const moduleList = res.data.modules || res.data;
      setAllModules(Array.isArray(moduleList) ? moduleList : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyModules();
  }, []);

  // 2. Initialize week data when a module is selected
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
          quiz: { questions: [] },
        }));
        setWeekData(skeleton);
      }
    }
  }, [selectedModule]);

  // 3. Toggle Visibility for Student Portal
  const toggleVisibility = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axios.patch(
        `${BASE_URL}/${id}/visibility`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllModules((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, isVisible: res.data.isVisible } : m
        )
      );
    } catch (err) {
      alert("Visibility change failed");
    }
  };

  // --- Handlers for Text & Files ---
  const handleTopicChange = (idx, val) => {
    const updated = [...weekData];
    updated[idx].topic = val;
    setWeekData(updated);
  };

  const handleMaterialInfoChange = (wIdx, sIdx, val) => {
    const updated = [...weekData];
    updated[wIdx].materials[sIdx].info = val;
    setWeekData(updated);
  };

  const handleFileChange = (wIdx, sIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...weekData];
      updated[wIdx].materials[sIdx].file = file;
      setWeekData(updated);
    }
  };

  const clearSlot = (wIdx, sIdx) => {
    const updated = [...weekData];
    updated[wIdx].materials[sIdx] = { info: "", fileUrl: "", file: null };
    setWeekData(updated);
  };

  // --- Week 8 Quiz Handlers ---
  const handleAddQuestion = () => {
    const updated = [...weekData];
    if (!updated[7].quiz) updated[7].quiz = { questions: [] };
    updated[7].quiz.questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setWeekData(updated);
  };

  // --- Save to Backend ---
  const handleSaveCurriculum = async () => {
    setIsSaving(true);
    const formData = new FormData();
    const sanitizedWeeks = weekData.map((w) => ({
      weekNumber: w.weekNumber,
      topic: w.topic,
      materials: w.materials.map((m) => ({ info: m.info, fileUrl: m.fileUrl })),
      quiz: w.weekNumber === 8 ? w.quiz : { questions: [] },
    }));

    formData.append("weeks", JSON.stringify(sanitizedWeeks));
    weekData.forEach((w) =>
      w.materials.forEach((s, i) => {
        if (s.file)
          formData.append(`file_week_${w.weekNumber}_slot_${i}`, s.file);
      })
    );

    try {
      await axios.post(
        `${BASE_URL}/${selectedModule._id}/curriculum`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Module Curriculum Published!");
      setSelectedModule(null);
      fetchMyModules();
    } catch (err) {
      alert("Error saving content");
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

          {!selectedModule ? (
            /* MODULE GRID (Showing only assigned modules) */
            <div className="mt-8">
              <h2 className="text-3xl font-black uppercase text-gray-800 mb-8 tracking-tighter">
                Assigned Modules
              </h2>
              {loading ? (
                <div className="py-20 text-center font-bold text-gray-300 animate-pulse uppercase">
                  Syncing Faculty Data...
                </div>
              ) : allModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allModules.map((m) => (
                    <div
                      key={m._id}
                      onClick={() => setSelectedModule(m)}
                      className={`bg-white p-10 rounded-[40px] border-l-[15px] shadow-sm cursor-pointer flex justify-between items-center group transition-all ${
                        m.isVisible
                          ? "border-[#407008]"
                          : "border-gray-300 hover:border-[#72333B]"
                      }`}
                    >
                      <div>
                        <h2 className="text-2xl font-black uppercase text-gray-800 group-hover:text-[#72333B]">
                          {m.name}
                        </h2>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">
                          Status: {m.isVisible ? "Published" : "Under Review"}
                        </p>
                      </div>
                      <button
                        onClick={(e) => toggleVisibility(e, m._id)}
                        className={`p-4 rounded-2xl shadow-sm transition-all ${
                          m.isVisible
                            ? "bg-[#407008] text-white shadow-green-100"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {m.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-20 rounded-[40px] text-center">
                  <p className="text-gray-400 font-bold uppercase">
                    No modules assigned to your account yet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* EDITOR VIEW */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#72333B] font-black uppercase text-xs mb-8 transition-colors"
              >
                <ArrowLeft size={16} /> Back to Modules
              </button>
              <div className="bg-white p-12 rounded-[60px] shadow-2xl border-t-[20px] border-[#72333B]">
                <h1 className="text-5xl font-black text-gray-800 uppercase mb-20 tracking-tighter leading-none">
                  {selectedModule.name}
                </h1>

                <div className="space-y-40">
                  {weekData.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className="relative pl-16 border-l-8 border-gray-100"
                    >
                      <div className="absolute -left-[36px] top-0 bg-[#72333B] text-white w-16 h-16 rounded-[25px] flex items-center justify-center font-black text-2xl shadow-xl">
                        {week.weekNumber}
                      </div>

                      <div className="mb-10">
                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-3">
                          Weekly Learning Topic
                        </label>
                        <textarea
                          value={week.topic}
                          onChange={(e) =>
                            handleTopicChange(wIdx, e.target.value)
                          }
                          className="w-full p-8 border-2 border-gray-100 rounded-[35px] focus:border-[#72333B] outline-none bg-gray-50/50 h-32 resize-none transition-all font-bold text-gray-700 shadow-inner"
                          placeholder="Describe the lesson plan..."
                        />
                      </div>

                      {/* 3 MATERIAL SLOTS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials.map((slot, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white border-2 border-gray-100 p-6 rounded-[35px] hover:border-[#407008] transition-all shadow-sm"
                          >
                            <input
                              type="text"
                              placeholder="Material Label..."
                              value={slot.info}
                              onChange={(e) =>
                                handleMaterialInfoChange(
                                  wIdx,
                                  sIdx,
                                  e.target.value
                                )
                              }
                              className="w-full text-[10px] font-black uppercase p-2 border-b border-gray-100 mb-4 outline-none focus:border-[#407008]"
                            />
                            {slot.file || slot.fileUrl ? (
                              <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-[#407008] truncate w-[80%]">
                                  {slot.file
                                    ? slot.file.name
                                    : "Saved Document"}
                                </span>
                                <button onClick={() => clearSlot(wIdx, sIdx)}>
                                  <XCircle
                                    size={16}
                                    className="text-red-400 hover:scale-110"
                                  />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center py-8 border-4 border-dashed border-gray-50 rounded-2xl cursor-pointer hover:bg-gray-50 group">
                                <Upload
                                  size={24}
                                  className="text-gray-200 group-hover:text-[#407008] transition-colors"
                                />
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(wIdx, sIdx, e)
                                  }
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* ASSESSMENT SECTION (WEEK 8 ONLY) */}
                      {week.weekNumber === 8 && (
                        <div className="bg-gray-50 p-10 rounded-[45px] border-2 border-white mt-12 shadow-inner">
                          <div className="flex justify-between items-center mb-10">
                            <h4 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">
                              Final Knowledge Check
                            </h4>
                            <button
                              onClick={handleAddQuestion}
                              className="bg-gray-800 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-[#72333B] transition-all shadow-lg active:scale-95"
                            >
                              <PlusCircle size={14} /> Add New Question
                            </button>
                          </div>

                          {week.quiz?.questions.map((q, qIdx) => (
                            <div
                              key={qIdx}
                              className="bg-white p-10 rounded-[40px] mb-8 border border-gray-100 relative shadow-sm group"
                            >
                              <input
                                value={q.questionText}
                                onChange={(e) => {
                                  const copy = [...weekData];
                                  copy[7].quiz.questions[qIdx].questionText =
                                    e.target.value;
                                  setWeekData(copy);
                                }}
                                className="w-full border-b-4 border-gray-50 p-4 font-black text-lg outline-none mb-8 focus:border-[#72333B] bg-transparent transition-all"
                                placeholder="Assessment Question?"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {q.options.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-transparent hover:border-gray-200 transition-all"
                                  >
                                    <input
                                      type="radio"
                                      checked={q.correctAnswer === oIdx}
                                      onChange={() => {
                                        const copy = [...weekData];
                                        copy[7].quiz.questions[
                                          qIdx
                                        ].correctAnswer = oIdx;
                                        setWeekData(copy);
                                      }}
                                      className="accent-[#407008] w-6 h-6 cursor-pointer"
                                    />
                                    <input
                                      value={opt}
                                      onChange={(e) => {
                                        const copy = [...weekData];
                                        copy[7].quiz.questions[qIdx].options[
                                          oIdx
                                        ] = e.target.value;
                                        setWeekData(copy);
                                      }}
                                      className="bg-transparent text-sm font-black uppercase outline-none w-full"
                                      placeholder="Option..."
                                    />
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={() => {
                                  const copy = [...weekData];
                                  copy[7].quiz.questions.splice(qIdx, 1);
                                  setWeekData(copy);
                                }}
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSaveCurriculum}
                  disabled={isSaving}
                  className="w-full bg-[#407008] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl mt-32 hover:bg-[#2d5006] transition-all active:scale-[0.98]"
                >
                  {isSaving
                    ? "PUBLISHING TO PORTAL..."
                    : "PUBLISH COMPLETE MODULE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodleTutor;
