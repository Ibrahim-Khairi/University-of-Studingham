import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import LecturesCalendar from "../components/Timetablecomponents/LecturesCalendar";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";

const Timetable = () => {
  const { user, loading: authLoading } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [week, _setWeek] = useState(1);
  const [academicYearStart, setAcademicYearStart] = useState(null);
  const [loading, setLoading] = useState(true);

  const isStudent = user?.role === "student";

  // Constraints logic
  const tutorMin = lectures.length
    ? Math.min(...lectures.map((l) => l.week))
    : 1;
  const tutorMax = lectures.length
    ? Math.max(...lectures.map((l) => l.week))
    : 1;
  const minWeek = isStudent ? 1 : tutorMin;
  const maxWeek = isStudent ? 32 : tutorMax;

  const setWeek = (nextWeek) => {
    if (typeof nextWeek === "function") {
      _setWeek((prev) => Math.min(maxWeek, Math.max(minWeek, nextWeek(prev))));
    } else {
      _setWeek(Math.min(maxWeek, Math.max(minWeek, nextWeek)));
    }
  };

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchTimetable = async () => {
      try {
        const endpoint = isStudent
          ? "http://localhost:5000/api/timetable/student"
          : "http://localhost:5000/api/timetable/tutor";

        const token = localStorage.getItem("accessToken");
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAcademicYearStart(res.data.academicYearStart || null);

        const formatted = (res.data.lectures || []).map((lecture) => {
          const tutorName = lecture.tutorId
            ? `${lecture.tutorId.firstName} ${lecture.tutorId.lastName}`
            : user.role === "tutor"
            ? `${user.firstName} ${user.lastName}`
            : "TBA";

          return {
            day:
              lecture.day?.charAt(0).toUpperCase() +
              lecture.day?.slice(1).toLowerCase(),
            time: lecture.startTime.slice(0, 5),
            week: lecture.weekNumber,
            title: lecture.moduleId?.name || "Independent Study",
            code: lecture.courseId?.code || "GEN",
            teacher: tutorName,
            room: lecture.room || "TBA",
          };
        });

        setLectures(formatted);
        _setWeek(
          isStudent
            ? 1
            : formatted.length
            ? Math.min(...formatted.map((l) => l.week))
            : 1
        );
      } catch (error) {
        console.error("Timetable Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user, authLoading, isStudent]);

  // --- PROFESSIONAL LOADING STATE ---
  if (loading)
    return (
      <div className="bg-[#EFEFEF] min-h-screen p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4">
          <div className="bg-[#72333B] h-[840px] rounded-[40px] animate-pulse" />
          <div className="space-y-6">
            <div className="h-16 bg-white rounded-3xl animate-pulse" />
            <div className="h-[700px] bg-white rounded-[60px] animate-pulse" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        {/* Sidebar */}
        <div>
          <DashboardPanel />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-6 overflow-hidden">
          <DashboardSearch />

          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 mt-2">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-800 leading-none">
                Academic <span className="text-[#72333B]">Schedule</span>
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="bg-[#407008] w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_#407008]" />
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                  Current View: Week {week} of 32
                </p>
              </div>
            </div>

            {/* Quick Stats / Legend */}
            <div className="hidden xl:flex gap-4 mt-4 md:mt-0">
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <GraduationCap size={18} className="text-[#4C86A8]" />
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">
                    Enrolled Course
                  </p>
                  <p className="text-xs font-bold text-gray-700">
                    {user?.courseId?.code || "BSc CS"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Component Wrapper */}
          <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 p-2 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <LecturesCalendar
              lectures={lectures}
              week={week}
              onWeekChange={setWeek}
              academicYearStart={academicYearStart}
              minWeek={minWeek}
              maxWeek={maxWeek}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
