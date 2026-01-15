import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../homecomponents/Navbar";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const courseRes = await axios.get(
          `http://localhost:5000/api/setup/course/${id}`
        );
        const moduleRes = await axios.get(
          `http://localhost:5000/api/modules/course/${id}`
        );
        setCourse(courseRes.data);
        setModules(moduleRes.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center font-bold opacity-50">
        LOADING COURSE...
      </div>
    );
  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <Navbar />

      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900">
            {course.name} ({course.code})
          </h1>
          <button
            onClick={() => navigate("/student-registration")}
            className="bg-[#4877DF] text-white px-10 py-3 rounded-xl font-bold text-lg hover:bg-[#365db3] transition-all shadow-lg active:scale-95"
          >
            Apply Now
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 border-b border-gray-200 pb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-10 py-2 rounded-lg font-black text-sm uppercase tracking-widest transition-all border-2 ${
              activeTab === "overview"
                ? "bg-white border-gray-300 text-gray-900 shadow-sm"
                : "bg-[#1B2631] border-[#1B2631] text-white hover:bg-gray-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-10 py-2 rounded-lg font-black text-sm uppercase tracking-widest transition-all border-2 ${
              activeTab === "curriculum"
                ? "bg-white border-gray-300 text-gray-900 shadow-sm"
                : "bg-[#1B2631] border-[#1B2631] text-white hover:bg-gray-800"
            }`}
          >
            Curriculum
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="max-w-7xl">
          {activeTab === "overview" ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <section>
                <h2 className="text-3xl font-black text-gray-900 mb-6">
                  About the Course
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {course.aboutTheCourse}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-gray-900 mb-6">
                  Course Structure
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {course.courseStructure}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-gray-900 mb-6">
                  Assessments
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {course.assessments}
                </p>
              </section>
            </div>
          ) : (
            /* Curriculum Tab showing modules by Year */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in slide-in-from-bottom-4 duration-500">
              {[1, 2, 3].map((year) => (
                <div key={year} className="space-y-6">
                  <div className="bg-[#72333B] text-white p-4 rounded-2xl shadow-md flex justify-between items-center">
                    <h3 className="font-black uppercase tracking-widest">
                      Year {year}
                    </h3>
                    <span className="text-[10px] opacity-70 font-bold">
                      CORE MODULES
                    </span>
                  </div>
                  <div className="space-y-4">
                    {modules.filter((m) => m.year === year).length > 0 ? (
                      modules
                        .filter((m) => m.year === year)
                        .map((mod) => (
                          <div
                            key={mod._id}
                            className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-[#407008]"
                          >
                            <p className="font-bold text-gray-800 uppercase text-sm leading-tight">
                              {mod.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400 text-xs italic">
                        Modules pending upload...
                      </p>
                    )}
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

export default CourseDetail;
