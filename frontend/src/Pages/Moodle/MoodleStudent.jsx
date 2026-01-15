import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  BookOpen,
  Lock,
  Download,
  Calendar,
  Info,
  FileText,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import DashboardPanel from "../../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../../components/Dashboardcomponents/DashboardSearch";

const MoodleStudent = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [scores, setScores] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  // 1. Set the initial year based on the student's actual level
  useEffect(() => {
    if (user?.levelOfStudy) {
      setActiveYear(user.levelOfStudy);
    }
  }, [user]);

  // 2. Fetch ALL modules for the selected year
  useEffect(() => {
    const fetchContent = async () => {
      // Guard: Ensure we have the necessary data before calling backend
      if (!user?.courseId || !activeYear) return;

      setLoading(true);
      try {
        // Fetching modules for current Course and selected Tab Year
        const res = await axios.get(
          `${BASE_URL}/api/setup/modules/${user.courseId}/${activeYear}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setModules(res.data); // This should be the array of 4-8 modules
      } catch (err) {
        console.error("Error loading modules:", err);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [user, activeYear, token]);

  // 3. Fetch student scores when a module is opened to see if they passed the quiz
  useEffect(() => {
    if (selectedModule) {
      axios
        .get(`${BASE_URL}/api/modules/${selectedModule._id}/my-scores`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setScores(res.data))
        .catch(() => setScores([]));
    }
  }, [selectedModule, token]);

  // programmatically trigger download via Blob (Fixes browser security issues)
  const handleDownloadAndOpen = async (fileUrl, fileName) => {
    window.open(`${BASE_URL}${fileUrl}`, "_blank");
    try {
      const res = await axios({
        url: `${BASE_URL}${fileUrl}`,
        method: "GET",
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "course-material");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed");
    }
  };

  const startQuiz = (week) => {
    setActiveQuiz(week);
    setUserAnswers(new Array(week.quiz.questions.length).fill(null));
  };

  const submitQuiz = async () => {
    if (userAnswers.includes(null))
      return alert("Please answer all questions.");
    try {
      const res = await axios.post(
        `${BASE_URL}/api/modules/quiz/submit`,
        {
          moduleId: selectedModule._id,
          weekNumber: activeQuiz.weekNumber,
          answers: userAnswers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Final Grade: ${res.data.score}/${res.data.total}`);
      setActiveQuiz(null);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />
        <div className="overflow-hidden">
          <DashboardSearch />

          {!selectedModule ? (
            /* --- VIEW 1: MODULE SELECTION --- */
            <div className="mt-8 p-4">
              <h1 className="text-3xl font-black uppercase text-gray-800 mb-8 tracking-tighter">
                My Learning Path
              </h1>

              {/* Year Tabs (Restricted Logic) */}
              <div className="flex gap-4 mb-10">
                {[1, 2, 3].map((y) => (
                  <button
                    key={y}
                    disabled={y > user?.levelOfStudy}
                    onClick={() => setActiveYear(y)}
                    className={`px-10 py-4 rounded-2xl font-black border-2 transition-all shadow-md flex items-center gap-2 ${
                      activeYear === y
                        ? "bg-[#407008] text-white border-[#407008]"
                        : "bg-white text-gray-400 border-white"
                    } ${
                      y > user?.levelOfStudy
                        ? "opacity-30 cursor-not-allowed grayscale"
                        : "hover:border-[#407008]/20"
                    }`}
                  >
                    {y > user?.levelOfStudy ? (
                      <Lock size={16} />
                    ) : (
                      <Calendar size={16} />
                    )}
                    Year {y}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#407008]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {modules.length > 0 ? (
                    modules.map((m) => (
                      <div
                        key={m._id}
                        onClick={() => setSelectedModule(m)}
                        className="bg-white p-10 rounded-[40px] border-l-[15px] border-[#407008] cursor-pointer shadow-sm hover:translate-x-2 transition-all"
                      >
                        <h2 className="text-2xl font-black uppercase text-gray-800">
                          {m.name}
                        </h2>
                        <p className="text-gray-400 text-[10px] font-black uppercase mt-2 tracking-widest">
                          Level {activeYear} Core Curriculum
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                      <p className="text-gray-400 font-black uppercase tracking-widest leading-loose">
                        No published modules found <br /> for Year {activeYear}{" "}
                        in this course.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* --- VIEW 2: 8-WEEK CONTENT (RESTORED ORIGINAL DESIGN) --- */
            <div className="mt-5 bg-white p-12 rounded-[60px] shadow-2xl border-t-[20px] border-[#72333B]">
              <button
                onClick={() => setSelectedModule(null)}
                className="text-gray-400 font-black uppercase text-xs mb-8 flex items-center gap-2 hover:text-[#72333B] transition-colors"
              >
                <ArrowLeft size={16} /> Back to Modules
              </button>
              <h1 className="text-5xl font-black text-gray-800 uppercase mb-20 tracking-tighter leading-none">
                {selectedModule.name}
              </h1>

              <div className="space-y-40">
                {/* LOOP THROUGH THE 8 WEEKS FROM DB */}
                {(selectedModule.weeks?.length > 0
                  ? selectedModule.weeks
                  : []
                ).map((week) => {
                  const existingScore = scores.find(
                    (s) => s.weekNumber === week.weekNumber
                  );

                  return (
                    <div
                      key={week.weekNumber}
                      className="relative pl-16 border-l-8 border-gray-100"
                    >
                      {/* Original Burgundy Badge Marker */}
                      <div className="absolute -left-[36px] top-0 bg-[#72333B] text-white w-16 h-16 rounded-[25px] flex items-center justify-center font-black text-2xl shadow-xl">
                        {week.weekNumber}
                      </div>

                      <h3 className="text-4xl font-black text-gray-800 uppercase mb-8 tracking-tight">
                        Week {week.weekNumber} Overview
                      </h3>

                      {/* Topic area with shadow-inner */}
                      <div className="bg-gray-50 p-10 rounded-[45px] text-gray-700 font-bold leading-relaxed mb-12 shadow-inner border border-gray-100">
                        {week.topic ||
                          "This week's details are currently being finalized by the tutor."}
                      </div>

                      {/* 3 Materials Grid from original design */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {week.materials?.map((slot, idx) => (
                          <div
                            key={idx}
                            className="bg-white border-2 border-gray-100 p-8 rounded-[35px] text-center shadow-sm hover:border-[#407008] transition-all"
                          >
                            <p className="text-xs font-black uppercase text-gray-800 mb-6 h-8 line-clamp-2">
                              {slot.info || "Material Slot"}
                            </p>
                            {slot.fileUrl ? (
                              <button
                                onClick={() =>
                                  handleDownloadAndOpen(slot.fileUrl, slot.info)
                                }
                                className="w-full bg-[#407008] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] shadow-lg hover:bg-[#325806]"
                              >
                                <Download size={16} /> Download
                              </button>
                            ) : (
                              <div className="text-gray-300 font-black text-[10px] uppercase border border-dashed p-4 rounded-2xl">
                                Not Available
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* --- ASSESSMENT SECTION (WEEK 8 ONLY) --- */}
                      {week.weekNumber === 8 &&
                        week.quiz?.questions?.length > 0 && (
                          <div className="mt-16 p-10 rounded-[45px] bg-[#407008]/5 border-2 border-white shadow-sm flex justify-between items-center">
                            <div className="flex items-center gap-6">
                              <div className="bg-[#407008] p-4 rounded-3xl text-white shadow-lg">
                                <HelpCircle size={30} />
                              </div>
                              <div>
                                <h4 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
                                  Final Knowledge Check
                                </h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                  {week.quiz.questions.length} Exam Questions
                                </p>
                              </div>
                            </div>

                            {existingScore ? (
                              <div className="bg-[#407008] text-white px-10 py-4 rounded-3xl font-black text-lg tracking-widest shadow-lg">
                                GRADE: {existingScore.score} /{" "}
                                {existingScore.totalQuestions}
                              </div>
                            ) : (
                              <button
                                onClick={() => startQuiz(week)}
                                className="bg-[#72333B] text-white px-10 py-4 rounded-3xl font-black uppercase text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                              >
                                Start Assessment
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* Information footer */}
              <div className="mt-32 p-10 bg-[#1B4F72]/10 rounded-[45px] border-2 border-[#1B4F72]/20 flex items-center gap-8 text-[#1B4F72]">
                <Info size={40} />
                <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
                  Course materials are synchronized by your module tutor. For
                  missing files, please contact academic support.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- QUIZ MODAL --- */}
      {activeQuiz && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[60px] p-12 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black uppercase text-[#72333B] tracking-tighter">
                Final Assessment
              </h2>
              <button onClick={() => setActiveQuiz(null)}>
                <XCircle
                  className="text-gray-300 hover:text-red-500"
                  size={30}
                />
              </button>
            </div>

            {activeQuiz.quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="mb-14 border-b border-gray-50 pb-12">
                <p className="text-xl font-black mb-8 text-gray-800 leading-snug">
                  {qIdx + 1}. {q.questionText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const copy = [...userAnswers];
                        copy[qIdx] = oIdx;
                        setUserAnswers(copy);
                      }}
                      className={`p-6 rounded-[30px] text-left font-bold border-4 transition-all ${
                        userAnswers[qIdx] === oIdx
                          ? "bg-[#407008] border-[#407008] text-white shadow-xl"
                          : "bg-gray-50 border-transparent text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-6 pt-4">
              <button
                onClick={() => setActiveQuiz(null)}
                className="flex-1 py-6 rounded-[30px] font-black text-gray-400 uppercase tracking-widest border-2 border-gray-100 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitQuiz}
                className="flex-1 py-6 rounded-[30px] font-black bg-[#407008] text-white uppercase tracking-widest shadow-2xl hover:bg-[#2d5006] transition-all"
              >
                Submit Final Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodleStudent;
