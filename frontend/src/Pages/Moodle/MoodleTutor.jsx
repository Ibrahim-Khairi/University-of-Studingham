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

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000/api/modules";

  useEffect(() => {
    fetchModules();
  }, []);

  // Sync data when module is opened
  useEffect(() => {
    if (selectedModule) {
      if (selectedModule.weeks?.length > 0) {
        setWeekData(selectedModule.weeks);
      } else {
        setWeekData(
          Array.from({ length: 8 }, (_, i) => ({
            weekNumber: i + 1,
            topic: "",
            materials: [
              { info: "", fileUrl: "" },
              { info: "", fileUrl: "" },
              { info: "", fileUrl: "" },
            ],
            quiz: { questions: [] },
          }))
        );
      }
    }
  }, [selectedModule]);

  const fetchModules = async () => {
    const res = await axios.get("http://localhost:5000/api/tutors/my-modules", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllModules(res.data.modules);
  };

  const toggleVisibility = async (e, id) => {
    e.stopPropagation();
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
  };

  // --- Handlers ---
  const handleTopicChange = (idx, val) => {
    const copy = [...weekData];
    copy[idx].topic = val;
    setWeekData(copy);
  };

  const handleMaterialInfoChange = (wIdx, sIdx, val) => {
    const copy = [...weekData];
    copy[wIdx].materials[sIdx].info = val;
    setWeekData(copy);
  };

  const handleFileChange = (wIdx, sIdx, e) => {
    const file = e.target.files[0];
    if (file) {
      const copy = [...weekData];
      copy[wIdx].materials[sIdx].file = file;
      setWeekData(copy);
    }
  };

  const clearSlot = (wIdx, sIdx) => {
    const copy = [...weekData];
    copy[wIdx].materials[sIdx] = { info: "", fileUrl: "", file: null };
    setWeekData(copy);
  };

  // --- Week 8 Assessment Logic ---
  const handleAddQuestion = () => {
    const copy = [...weekData];
    if (!copy[7].quiz) copy[7].quiz = { questions: [] };
    copy[7].quiz.questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setWeekData(copy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    // Sanitize JSON to prevent File objects from breaking stringify
    const sanitizedWeeks = weekData.map((w) => ({
      weekNumber: w.weekNumber,
      topic: w.topic,
      materials: w.materials.map((m) => ({ info: m.info, fileUrl: m.fileUrl })),
      quiz: w.weekNumber === 8 ? w.quiz : { questions: [] },
    }));

    formData.append("weeks", JSON.stringify(sanitizedWeeks));

    // Append Files
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
      alert("Curriculum Published Successfully!");
      setSelectedModule(null);
      fetchModules();
    } catch (err) {
      alert("Failed to save");
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
            /* --- LIST VIEW --- */
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {allModules.map((m) => (
                <div
                  key={m._id}
                  onClick={() => setSelectedModule(m)}
                  className={`bg-white p-10 rounded-[40px] border-l-[15px] shadow-sm cursor-pointer flex justify-between items-center group transition-all ${
                    m.isVisible ? "border-[#407008]" : "border-gray-200"
                  }`}
                >
                  <div>
                    <h2 className="text-2xl font-black uppercase text-gray-800 group-hover:text-[#72333B]">
                      {m.name}
                    </h2>
                    <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-widest leading-none">
                      Year {m.year} Curriculum
                    </p>
                  </div>
                  <button
                    onClick={(e) => toggleVisibility(e, m._id)}
                    className={`p-4 rounded-2xl ${
                      m.isVisible
                        ? "bg-[#407008] text-white shadow-lg shadow-green-100"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {m.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* --- EDITOR VIEW (ORIGINAL DESIGN) --- */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#72333B] font-black uppercase text-xs mb-8 transition-colors"
              >
                <ArrowLeft size={16} /> Back to My Modules
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
                          className="w-full p-8 border-2 border-gray-100 rounded-[35px] focus:border-[#72333B] outline-none bg-gray-50/50 h-32 resize-none transition-all font-bold text-gray-700"
                          placeholder="What will students learn this week?"
                        />
                      </div>

                      {/* ORIGINAL 3-COLUMN SLOTS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials.map((slot, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white border-2 border-gray-50 p-6 rounded-[35px] hover:border-[#407008] transition-all shadow-sm"
                          >
                            <input
                              type="text"
                              placeholder="Material Title..."
                              value={slot.info}
                              onChange={(e) =>
                                handleMaterialInfoChange(
                                  wIdx,
                                  sIdx,
                                  e.target.value
                                )
                              }
                              className="w-full text-[10px] font-black uppercase p-2 border-b border-gray-50 mb-4 outline-none focus:border-[#407008]"
                            />
                            {slot.file || slot.fileUrl ? (
                              <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-[#407008] truncate w-[80%]">
                                  {slot.file
                                    ? slot.file.name
                                    : "Saved Material"}
                                </span>
                                <button onClick={() => clearSlot(wIdx, sIdx)}>
                                  <XCircle
                                    size={16}
                                    className="text-red-400 hover:scale-110"
                                  />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center py-8 border-4 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 group">
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

                      {/* --- WEEK 8 ONLY: QUIZ BUILDER --- */}
                      {week.weekNumber === 8 && (
                        <div className="bg-gray-50 p-10 rounded-[45px] border-2 border-white mt-12 shadow-inner">
                          <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-3">
                              <HelpCircle
                                className="text-[#72333B]"
                                size={28}
                              />
                              <h4 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">
                                Final Assessment
                              </h4>
                            </div>
                            <button
                              onClick={handleAddQuestion}
                              className="bg-gray-800 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-[#72333B] transition-all"
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
                                className="w-full border-b-4 border-gray-50 p-4 font-black text-lg outline-none mb-8 focus:border-[#72333B]"
                                placeholder="Question Text?"
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
                                      className="accent-[#407008] w-6 h-6"
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
                                      placeholder="Option text..."
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
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl"
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
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-[#407008] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl mt-32 hover:bg-[#2d5006] transition-all"
                >
                  {isSaving ? "PUBLISHING..." : "PUBLISH UPDATES"}
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
