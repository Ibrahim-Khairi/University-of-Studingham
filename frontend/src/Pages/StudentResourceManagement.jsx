import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import {
  ChevronRight,
  X,
  Award,
  FileCheck,
  Info,
  CheckCircle2,
  BookOpen,
  Layers,
} from "lucide-react";

const StudentResourceManagement = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [selectedYearResults, setSelectedYearResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/api/modules/my-results/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Failed to load results");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchResults();
  }, [user]);

  const handleOpenYear = (year) => {
    if (year > user?.levelOfStudy) return;

    const yearData = results.filter((r) => {
      const moduleYear = r.moduleId?.year || r.year;
      return Number(moduleYear) === year;
    });

    const grouped = yearData.reduce((acc, curr) => {
      const moduleId = curr.moduleId?._id || curr.moduleId;
      const moduleName = curr.moduleId?.name || "Unknown Module";

      if (!acc[moduleId]) {
        acc[moduleId] = {
          name: moduleName,
          totalScore: 0,
          totalQuestions: 0,
          quizzes: [],
        };
      }
      acc[moduleId].quizzes.push(curr);
      acc[moduleId].totalScore += curr.score;
      acc[moduleId].totalQuestions += curr.totalQuestions;
      return acc;
    }, {});

    setSelectedYearResults({ year, modules: Object.values(grouped) });
    setIsModalOpen(true);
  };

  const getLevelDisplay = (level) => {
    if (level === 1) return "C - Certificate (Level 1)";
    if (level === 2) return "I - Intermediate (Level 2)";
    if (level === 3) return "H - Honours (Level 3)";
    return "N/A";
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />

        <div className="flex flex-col gap-6">
          <DashboardSearch />

          {/* ================= PROGRAMME DETAILS (AS PER IMAGE) ================= */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-2">
              Programme Details
            </h3>
            <p className="text-gray-400 font-bold text-[13px] mb-8">
              Your programme details for academic year 2025/6 are as follows:
            </p>

            <div className="overflow-hidden border-2 border-[#4A8DCD] rounded-xl">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <Row
                    label="Programme of Study"
                    value="Bachelor Of Science With Honours (Single) - Computer Science (Full Time Programme)"
                  />
                  <Row
                    label="Mode of Attendance"
                    value={user?.modeOfStudy || "Full Time"}
                  />
                  <Row
                    label="Level"
                    value={getLevelDisplay(user?.levelOfStudy)}
                  />
                  {/* NEW DETAILS FROM IMAGE */}
                  <Row label="Start Date" value="September 2024" />
                  <Row label="Expected Completion Date" value="June 2027" />
                  <Row
                    label="Degree Awarding Body"
                    value="University of Studingham"
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* YEAR SELECTION CARDS */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 max-w-md">
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-8">
              Course Results
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((y) => {
                const isLocked = y > user?.levelOfStudy;
                const hasData = results.some(
                  (r) => (r.moduleId?.year || r.year) === y
                );

                return (
                  <button
                    key={y}
                    disabled={isLocked}
                    onClick={() => handleOpenYear(y)}
                    className={`w-full flex justify-between items-center p-6 rounded-[25px] border-2 transition-all ${
                      isLocked
                        ? "opacity-20 grayscale cursor-not-allowed"
                        : "bg-white border-gray-50 hover:border-[#407008]/30 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          hasData
                            ? "bg-[#407008] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Layers size={18} />
                      </div>
                      <p className="font-black text-gray-700 uppercase text-xs tracking-widest">
                        Year {y} Results
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS MODAL (Remains same as previous logic) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[60px] p-12 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-hidden flex flex-col border-t-[15px] border-[#407008]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"
            >
              <X size={35} />
            </button>

            <div className="flex items-center gap-5 mb-10">
              <div className="bg-[#407008] p-5 rounded-[25px] text-white shadow-xl">
                <Award size={40} />
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase text-gray-800 tracking-tighter leading-none">
                  Year {selectedYearResults.year} Report
                </h2>
                <p className="text-[#407008] font-black uppercase text-[10px] tracking-[0.4em] mt-3">
                  Verified Performance Records
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-8">
              {selectedYearResults.modules.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-gray-50 rounded-[40px] p-8 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                    <h4 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                      {mod.name}
                    </h4>
                    <span className="text-2xl font-black text-gray-900">
                      {Math.round((mod.totalScore / mod.totalQuestions) * 100)}%
                    </span>
                  </div>
                  <div className="space-y-3">
                    {mod.quizzes.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm"
                      >
                        <span className="font-bold text-gray-500 text-xs uppercase tracking-widest">
                          Week {q.weekNumber} Assessment
                        </span>
                        <span className="font-black text-gray-800 text-sm">
                          {q.score} / {q.totalQuestions}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100">
              <button
                onClick={() => window.print()}
                className="w-full py-6 bg-[#72333B] text-white font-black rounded-[30px] shadow-2xl uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <FileCheck size={22} /> Print Academic Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Row matching the image's layout
const Row = ({ label, value }) => (
  <tr className="border-b border-[#4A8DCD]/30 last:border-0 group">
    <td className="bg-[#D9D9D9]/40 p-4 font-black uppercase text-[12px] text-gray-700 w-1/3 border-r border-[#4A8DCD]/30 group-hover:bg-gray-200 transition-colors text-right pr-6">
      {label}
    </td>
    <td className="p-4 font-bold text-gray-800 text-[14px] pl-6 uppercase">
      {value}
    </td>
  </tr>
);

export default StudentResourceManagement;
