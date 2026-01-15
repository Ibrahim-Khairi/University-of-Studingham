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
  ChevronRight,
  PlusCircle,
  HelpCircle,
  User, // Added User icons
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
  const [weekData, setWeekData] = useState([]);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000/api/modules";

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/setup/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseSelect = async (course) => {
    try {
      // Backend now populates tutor details
      const res = await axios.get(`${BASE_URL}/course/${course._id}`);
      setModules(res.data);
      setSelectedCourse(course);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleModuleVisibility = async (moduleId) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/${moduleId}/visibility`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModules((prev) =>
        prev.map((m) =>
          m._id === moduleId ? { ...m, isVisible: res.data.isVisible } : m
        )
      );
    } catch (err) {
      alert("Visibility toggle failed");
    }
  };

  // --- Handlers for Content ---
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

  // --- Week 8 Quiz Logic ---
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
      alert("Module Published Successfully!");
      setSelectedModule(null);
    } catch (err) {
      alert("Error saving curriculum");
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

          {!selectedCourse ? (
            /* STEP 1: SELECT COURSE */
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c._id}
                  onClick={() => handleCourseSelect(c)}
                  className="bg-white p-10 rounded-[40px] border-b-[12px] border-[#72333B] cursor-pointer shadow-md hover:translate-y-[-5px] transition-all text-center"
                >
                  <BookOpen size={40} className="text-[#72333B] mx-auto mb-4" />
                  <h2 className="font-black uppercase text-gray-800 text-xl tracking-tight leading-none">
                    {c.name}
                  </h2>
                </div>
              ))}
            </div>
          ) : !selectedModule ? (
            /* STEP 2: YEAR VIEW WITH TUTOR INFO */
            <div className="mt-8 p-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="mb-8 text-gray-400 font-black uppercase text-xs"
              >
                ← Back to Courses
              </button>
              <h1 className="text-5xl font-black mb-12 uppercase text-gray-800 tracking-tighter">
                {selectedCourse.name}
              </h1>
              {[1, 2, 3].map((year) => (
                <div key={year} className="mb-14">
                  <h2 className="text-2xl font-black uppercase mb-6 text-gray-700 border-b-2 pb-2">
                    Academic Year {year}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {modules
                      .filter((m) => m.year === year)
                      .map((m) => (
                        <div
                          key={m._id}
                          className={`bg-white p-8 rounded-[35px] shadow-sm border-2 transition-all flex justify-between items-center group ${
                            m.isVisible
                              ? "border-[#407008]/20"
                              : "border-gray-100 opacity-90"
                          }`}
                        >
                          <div
                            onClick={() => setSelectedModule(m)}
                            className="cursor-pointer flex-1"
                          >
                            <h3 className="font-black text-gray-800 uppercase text-xl mb-1">
                              {m.name}
                            </h3>

                            {/* --- NEW TUTOR ASSIGNMENT SECTION --- */}
                            <div className="flex items-center gap-2 mb-3">
                              {m.tutorId ? (
                                <span className="text-[10px] font-black uppercase text-blue-500 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                                  <UserCheck size={12} />
                                  {m.tutorId.lastName}
                                </span>
                              ) : (
                                <span className="text-[10px] font-black uppercase text-amber-500 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                  <UserX size={12} /> Awaiting Tutor
                                </span>
                              )}
                            </div>

                            <span
                              className={`text-[9px] font-black uppercase tracking-widest ${
                                m.isVisible ? "text-[#407008]" : "text-gray-300"
                              }`}
                            >
                              Status: {m.isVisible ? "Published" : "Hidden"}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleModuleVisibility(m._id)}
                            className={`p-4 rounded-2xl transition-all shadow-sm active:scale-90 ${
                              m.isVisible
                                ? "bg-[#407008] text-white shadow-green-100"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {m.isVisible ? (
                              <Eye size={20} />
                            ) : (
                              <EyeOff size={20} />
                            )}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* STEP 3: EDITOR (Restored design) */
            <div className="mt-5 max-w-6xl mx-auto pb-20 px-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-gray-400 mb-8 font-black uppercase text-xs hover:text-[#72333B] transition-colors"
              >
                <ArrowLeft size={16} /> Back
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
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials.map((slot, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white border-2 border-gray-100 p-6 rounded-[35px] hover:border-[#407008] transition-all shadow-sm"
                          >
                            <input
                              type="text"
                              placeholder="Title..."
                              value={slot.info}
                              onChange={(e) =>
                                handleMaterialInfoChange(
                                  wIdx,
                                  sIdx,
                                  e.target.value
                                )
                              }
                              className="w-full text-[10px] font-black uppercase p-2 border-b mb-4 outline-none focus:border-[#407008]"
                            />
                            {slot.file || slot.fileUrl ? (
                              <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-[#407008] truncate w-[80%]">
                                  {slot.file
                                    ? slot.file.name
                                    : "Stored Material"}
                                </span>
                                <button
                                  onClick={() => {
                                    const copy = [...weekData];
                                    copy[wIdx].materials[sIdx] = {
                                      info: "",
                                      fileUrl: "",
                                    };
                                    setWeekData(copy);
                                  }}
                                >
                                  <XCircle size={16} className="text-red-400" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center py-8 border-4 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 group transition-all">
                                <Upload
                                  size={24}
                                  className="text-gray-200 group-hover:text-[#407008]"
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

                      {/* QUIZ SECTION (Only Week 8) */}
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
                              className="bg-gray-800 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-[#72333B] shadow-lg transition-all active:scale-95"
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
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
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
                  className="w-full bg-[#407008] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl mt-32 hover:bg-[#2d5006] transition-all"
                >
                  {isSaving ? "PUBLISHING..." : "PUBLISH COMPLETE MODULE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodleAdmin;
