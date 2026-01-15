import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import DashboardSchedule from "../components/Dashboardcomponents/DashboardSchedule.jsx";
import { Clock, MapPin, User as UserIcon } from "lucide-react";

const TutorDashboard = () => {
  const { loading: authLoading, user } = useAuth();
  const [tutorProfile, setTutorProfile] = useState(null); // To store firstName/lastName
  const [moduleData, setModuleData] = useState([]);
  const [nextClass, setNextClass] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("accessToken");

  const priorityStyles = {
    urgent: "border-[#8E3B46] bg-[#8E3B46]/5 text-[#8E3B46]",
    normal: "border-[#4C86A8] bg-[#4C86A8]/5 text-[#4C86A8]",
    social: "border-[#407008] bg-[#407008]/5 text-[#407008]",
  };

  useEffect(() => {
    if (!user) return;

    const fetchTutorDashboardData = async () => {
      try {
        // 1. Fetch FULL Profile (This fixes the missing Name issue)
        const profileRes = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTutorProfile(profileRes.data);

        // 2. Fetch assigned modules
        const modRes = await axios.get(`${BASE_URL}/tutors/my-modules`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assignedModules = modRes.data.modules || [];

        // 3. Fetch student counts
        const modulesWithCounts = await Promise.all(
          assignedModules.map(async (m) => {
            try {
              const rosterRes = await axios.get(
                `${BASE_URL}/attendance/roster/${m.courseId}/${m.year}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return { name: m.name, studentCount: rosterRes.data.length };
            } catch (err) {
              return { name: m.name, studentCount: 0 };
            }
          })
        );
        setModuleData(modulesWithCounts);

        // 4. Fetch Notices
        const noticeRes = await axios.get(`${BASE_URL}/notices/my-board`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(noticeRes.data.slice(0, 3));

        // 5. Fetch timetable and find the actual "Next Class"
        const timeRes = await axios.get(`${BASE_URL}/timetable/tutor`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date();
        const currentTime =
          now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0");
        const todayStr = now.toISOString().split("T")[0];

        const upcoming = timeRes.data.lectures
          .filter((lec) => {
            const lecDate = lec.date.split("T")[0];
            // If class is today, check if it's in the future. Otherwise, check if date is in future.
            return lecDate === todayStr
              ? lec.startTime > currentTime
              : lecDate > todayStr;
          })
          .sort((a, b) => {
            if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
            return a.startTime.localeCompare(b.startTime);
          })[0];

        setNextClass(upcoming);
      } catch (err) {
        console.error("Error fetching tutor dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDashboardData();
  }, [user, token]);

  if (authLoading || loading) {
    return (
      <div className="bg-[#EFEFEF] p-5 min-h-screen flex items-center justify-center">
        <p className="text-gray-300 font-black uppercase tracking-widest animate-pulse">
          Syncing Faculty Data...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <div className="h-fit sticky top-5">
          <DashboardPanel />
        </div>

        <div className="flex flex-col gap-5">
          <DashboardSearch />

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-4">
            {/* 1. Lecturer Overview */}
            <div className="bg-[#4C86A8] p-8 rounded-[40px] shadow-lg flex flex-col justify-center text-white">
              <Link
                to="/tutor/timetable"
                className="text-white border-b-2 border-white/30 text-[20px] font-bold inline-block mb-4 self-start hover:border-white transition-all"
              >
                Lecturer Overview
              </Link>
              <div className="space-y-2">
                {moduleData.length > 0 ? (
                  moduleData.map((m, idx) => (
                    <p key={idx} className="text-[18px] font-bold">
                      {m.name} — {m.studentCount} Students
                    </p>
                  ))
                ) : (
                  <p className="opacity-60 italic">No assigned modules</p>
                )}

                {/* Fixed "Room TBA" logic */}
                <p className="text-[18px] font-bold flex items-center gap-2 mt-2">
                  <Clock size={18} />
                  Next Class:{" "}
                  {nextClass
                    ? `${nextClass.startTime}, ${nextClass.room || "Room TBA"}`
                    : "No more classes today"}
                </p>

                {/* Fixed Tutor Name: Uses fetched profile data */}
                <p className="text-[22px] font-black mt-6 border-t border-white/20 pt-4 uppercase tracking-tighter">
                  Dr. {tutorProfile?.firstName || user?.firstName}{" "}
                  {tutorProfile?.lastName || user?.lastName}
                </p>
              </div>
            </div>

            {/* 2. Noticeboard */}
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
                        <span className="text-[10px] text-gray-200 font-black uppercase tracking-widest">
                          No Broadcast
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <DashboardSchedule />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
