import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import {
  Mail,
  Phone,
  User,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [studentProfile, setStudentProfile] = useState(null);
  const [allLectures, setAllLectures] = useState([]); // Store all fetched lectures
  const [tutors, setTutors] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // WEEK NAVIGATION STATE
  const [currentWeek, setCurrentWeek] = useState(1);

  const BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("accessToken");

  // 1. ACADEMIC CALENDAR LOGIC (Consistent with Tutor Side)
  const ACADEMIC_YEAR_START = new Date("2025-09-22");
  const calculateCurrentAcademicWeek = () => {
    const today = new Date();
    if (today < ACADEMIC_YEAR_START) return 1;
    const msecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const diff = today.getTime() - ACADEMIC_YEAR_START.getTime();
    const week = Math.ceil((diff + 1) / msecondsInWeek);
    return Math.max(1, Math.min(week, 32));
  };

  const priorityStyles = {
    urgent: "border-[#8E3B46] bg-[#8E3B46]/5 text-[#8E3B46]",
    normal: "border-[#4C86A8] bg-[#4C86A8]/5 text-[#4C86A8]",
    social: "border-[#407008] bg-[#407008]/5 text-[#407008]",
  };

  useEffect(() => {
    if (!user) return;

    const fetchStudentData = async () => {
      try {
        // Set starting week view
        setCurrentWeek(calculateCurrentAcademicWeek());

        // 1. Get Student Profile
        const profileRes = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentProfile(profileRes.data);

        // 2. Get Full Timetable
        const timeRes = await axios.get(`${BASE_URL}/timetable/student`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllLectures(timeRes.data.lectures || []);

        // 3. Get Notices
        const noticeRes = await axios.get(`${BASE_URL}/notices/my-board`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(noticeRes.data.slice(0, 3));

        // 4. Get Tutors
        const modRes = await axios.get(
          `${BASE_URL}/setup/modules/${profileRes.data.courseId}/${profileRes.data.levelOfStudy}?all=true`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const staffRes = await axios.get(`${BASE_URL}/admin/public/tutors`);
        setTutors(
          staffRes.data.filter((t) =>
            modRes.data.some((m) => m.tutorId === t.id)
          )
        );
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [user, token]);

  // Derived state: Filter lectures for the currently selected week
  const filteredLectures = allLectures
    .filter((l) => l.weekNumber === currentWeek)
    .sort((a, b) => {
      if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

  // Calculate Next Class (Overall earliest upcoming class from today onwards)
  const getNextClass = () => {
    const now = new Date();
    const currentTime =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");
    const todayStr = now.toISOString().split("T")[0];

    const upcoming = allLectures
      .filter((lec) => {
        const lecDate = lec.date.split("T")[0];
        return lecDate === todayStr
          ? lec.startTime > currentTime
          : lecDate > todayStr;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
        return a.startTime.localeCompare(b.startTime);
      })[0];

    return upcoming
      ? `${upcoming.startTime}, ${upcoming.room || "TBA"}`
      : "No upcoming classes";
  };

  if (authLoading || loading)
    return (
      <div className="p-10 font-black text-gray-300 animate-pulse uppercase tracking-widest h-screen flex items-center justify-center">
        Syncing Academic Profile...
      </div>
    );

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <div className="h-fit sticky top-5">
          <DashboardPanel />
        </div>

        <div className="flex flex-col gap-5">
          <DashboardSearch />

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-4">
            {/* Course Overview */}
            <div className="bg-[#4C86A8] p-8 rounded-[40px] shadow-lg flex flex-col justify-center text-white">
              <Link
                to="/student/moodle"
                className="text-white border-b-2 border-white/30 text-[20px] font-bold inline-block mb-4 self-start hover:border-white transition-all"
              >
                Course Details
              </Link>
              <div className="space-y-2">
                <p className="text-[18px] font-bold uppercase tracking-tighter opacity-80">
                  {studentProfile?.courseName || "Undergraduate Studies"}
                </p>
                <p className="text-[18px] font-bold">
                  Level {studentProfile?.levelOfStudy} — Year{" "}
                  {new Date().getFullYear()}
                </p>
                <p className="text-[18px] font-bold flex items-center gap-2">
                  <Clock size={18} /> Next Class: {getNextClass()}
                </p>
                <p className="text-[22px] font-black mt-6 border-t border-white/20 pt-4 uppercase tracking-tighter">
                  {studentProfile?.firstName} {studentProfile?.lastName}
                </p>
              </div>
            </div>

            {/* Noticeboard */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <svg width="45" height="58" viewBox="0 0 45 58" fill="none">
                  <path
                    d="M29.5683 50C29.5683 52.9253 28.0846 55.1643 25.6749 56.6277C23.266 58.0904 20.2978 58.0904 17.8934 56.6277C15.483 55.1643 14 52.9253 14 50"
                    fill="black"
                  />
                  <path
                    d="M22.4757 0C24.599 0 26.3091 1.37598 26.3091 3.49197C26.3091 4.82381 26.3533 5.81758 27.1496 6.07213C33.9205 8.22121 38.2622 13.2586 38.2622 19.8004V30.7957C38.2622 35.833 40.2228 36.8528 42.6901 38.7797C46.2634 41.5655 45.4477 47.3665 41.3474 47.3626H3.60552C-0.494797 47.3665 -1.31051 41.5655 2.26274 38.7797C4.72713 36.8528 6.6907 35.833 6.6907 30.7957V19.8004C6.6907 13.2586 11.0324 8.22121 17.8033 6.07213C18.5973 5.81758 18.6438 4.82381 18.6438 3.49197C18.6445 1.37598 20.3554 0 22.4757 0Z"
                    fill="black"
                  />
                </svg>
                <h3 className="text-[35px] font-black ml-5 uppercase tracking-tighter">
                  Noticeboard
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {notices.length > 0
                  ? notices.map((notice) => (
                      <div
                        key={notice._id}
                        className={`h-[120px] rounded-[25px] border-4 p-4 flex flex-col justify-center transition-all hover:scale-[1.02] ${
                          priorityStyles[notice.priority] ||
                          priorityStyles.normal
                        }`}
                      >
                        <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 truncate">
                          {notice.title}
                        </h4>
                        <p className="text-[9px] font-bold leading-tight line-clamp-3 opacity-80 uppercase">
                          {notice.content}
                        </p>
                      </div>
                    ))
                  : [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-[120px] rounded-[25px] border-4 border-gray-100 flex items-center justify-center"
                      >
                        <span className="text-[10px] text-gray-200 font-black uppercase">
                          No Update
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
            {/* WEEK-WISE ACADEMIC SCHEDULE (NEW LOGIC) */}
            <div className="space-y-6">
              <div className="bg-white rounded-[30px] p-6 flex justify-between items-center shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="bg-[#1761EB] w-4 h-12 rounded-full" />
                  <div>
                    <h3 className="text-[22px] font-black uppercase tracking-tighter">
                      Academic Schedule
                    </h3>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                      Week {currentWeek}{" "}
                      {currentWeek === calculateCurrentAcademicWeek() &&
                        "(Current)"}
                    </p>
                  </div>
                </div>
                {/* NAVIGATION BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentWeek((p) => Math.max(1, p - 1))}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentWeek((p) => Math.min(32, p + 1))}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredLectures.length > 0 ? (
                  filteredLectures.map((lec, idx) => (
                    <div
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-[#4C86A8]" : "bg-[#407008]"
                      } p-6 rounded-[25px] text-white flex gap-6 shadow-md transition-all hover:translate-x-1`}
                    >
                      <div className="border-r border-white/30 pr-6 text-center min-w-[80px]">
                        <p className="font-black text-xl leading-none mb-1">
                          {lec.startTime}
                        </p>
                        <p className="text-[10px] opacity-70 font-bold uppercase">
                          {new Date(lec.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="font-black text-lg uppercase tracking-tight">
                          {lec.moduleId?.name}
                        </p>
                        <p className="text-xs font-bold opacity-70 flex items-center gap-1">
                          <MapPin size={12} /> {lec.room || "TBA"} • {lec.day}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-16 rounded-[30px] text-center border-4 border-dashed border-gray-100">
                    <p className="text-gray-300 font-black uppercase tracking-widest">
                      No classes scheduled for Week {currentWeek}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* My Tutors */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm flex flex-col h-fit">
              <h3 className="text-[24px] font-black uppercase tracking-tighter mb-8 border-b pb-4">
                My Lecturers
              </h3>
              <div className="space-y-6">
                {tutors.length > 0 ? (
                  tutors.map((tutor) => (
                    <div
                      key={tutor.id}
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shadow-inner border-2 border-transparent group-hover:border-[#4C86A8] transition-all">
                        {tutor.picture ? (
                          <img
                            src={`http://localhost:5000${tutor.picture}`}
                            alt={tutor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <User size={30} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-800 uppercase text-sm leading-tight">
                          {tutor.name}
                        </h4>
                        <div className="flex flex-col gap-1 mt-1">
                          <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Mail size={10} /> {tutor.email}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Phone size={10} />{" "}
                            {tutor.phone || "No phone listed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 italic text-sm font-bold uppercase tracking-widest text-center py-10">
                    Loading faculty directory...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
