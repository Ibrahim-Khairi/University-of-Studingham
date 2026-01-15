import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import {
  CheckCircle,
  Clock,
  MapPin,
  User,
  Calendar,
  Lock,
  Activity,
  ChevronRight,
} from "lucide-react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";

const StudentDigitalRegister = () => {
  const { user, loading: authLoading } = useAuth();
  const [displayLecture, setDisplayLecture] = useState(null);
  const [isOngoing, setIsOngoing] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchRelevantLecture = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${BASE_URL}/api/timetable/student`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const lectures = res.data.lectures || [];
        const academicStart = new Date(res.data.academicYearStart);
        const now = new Date();

        // 1. Calculate Current Week
        const diffInMs = now - academicStart;
        const currentWeek = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));

        const daysOrder = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDay = daysOrder[now.getDay()];
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // 2. FIND RELEVANT LECTURE (Ongoing > Next Today > First in Timetable)
        // Filter lectures for current week
        const thisWeekLectures = lectures.filter(
          (l) => l.weekNumber === currentWeek
        );

        // Sort them by Day and Time
        const sorted = thisWeekLectures.sort((a, b) => {
          if (daysOrder.indexOf(a.day) !== daysOrder.indexOf(b.day)) {
            return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
          }
          return a.startTime.localeCompare(b.startTime);
        });

        // Find Ongoing
        let found = sorted.find((lec) => {
          const [sh, sm] = lec.startTime.split(":").map(Number);
          const [eh, em] = lec.endTime.split(":").map(Number);
          return (
            lec.day === currentDay &&
            currentMinutes >= sh * 60 + sm &&
            currentMinutes <= eh * 60 + em
          );
        });

        if (found) {
          setIsOngoing(true);
        } else {
          // Find Next Today or Next in Week
          found =
            sorted.find((lec) => {
              const [sh, sm] = lec.startTime.split(":").map(Number);
              const isLaterToday =
                lec.day === currentDay && sh * 60 + sm > currentMinutes;
              const isLaterInWeek =
                daysOrder.indexOf(lec.day) > daysOrder.indexOf(currentDay);
              return isLaterToday || isLaterInWeek;
            }) ||
            sorted[0] ||
            lectures[0]; // Fallback to very first lecture if week is over
          setIsOngoing(false);
        }

        if (found) {
          setDisplayLecture(found);
          // Sync check-in status
          const checkRes = await axios.get(
            `${BASE_URL}/api/attendance/portal`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsCheckedIn(checkRes.data.isCheckedIn);
        }
      } catch (error) {
        console.error("Timetable Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelevantLecture();
  }, [user, authLoading]);

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/api/attendance/check-in`,
        { lectureId: displayLecture._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsCheckedIn(true);
      alert("Attendance Verified!");
    } catch (err) {
      alert("Check-in failed.");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black animate-pulse">
        Fetching Curriculum Details...
      </div>
    );

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <DashboardPanel />

        <div className="flex flex-col justify-center max-w-5xl mx-auto w-full">
          {/* 1. COURSE HEADING */}
          <div className="mb-10 px-4">
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none text-gray-900">
              {displayLecture
                ? displayLecture.moduleId.name
                : "Session Information"}
            </h3>
            <div className="flex items-center gap-3 mt-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOngoing ? "bg-[#54AD9E] animate-pulse" : "bg-gray-300"
                }`}
              />
              <p
                className={`text-sm font-black uppercase tracking-[0.4em] ${
                  isOngoing ? "text-[#54AD9E]" : "text-gray-400"
                }`}
              >
                {isOngoing
                  ? "Live Session Ongoing"
                  : "Upcoming Academic Session"}
              </p>
            </div>
          </div>

          {displayLecture ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
              {/* 2. LECTURE DETAILS (Matches Timetable Data) */}
              <div className="bg-white rounded-[50px] p-12 shadow-sm border border-gray-100 flex flex-col justify-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Activity size={120} />
                </div>
                <InfoRow
                  icon={<Calendar />}
                  label="Schedule"
                  value={`${displayLecture.day}, Week ${displayLecture.weekNumber}`}
                />
                <InfoRow
                  icon={<Clock />}
                  label="Time Slot"
                  value={`${displayLecture.startTime} - ${displayLecture.endTime}`}
                />
                <InfoRow
                  icon={<MapPin />}
                  label="Campus Room"
                  value={displayLecture.room || "Main Hall"}
                />
                <InfoRow
                  icon={<User />}
                  label="Instructor"
                  value={`Dr. ${displayLecture.tutorId?.lastName || "Staff"}`}
                />
              </div>

              {/* 3. CHECK-IN ACTION BOX */}
              <div
                className={`rounded-[60px] p-12 text-white shadow-2xl flex flex-col justify-center items-center text-center transition-all duration-700 ${
                  isOngoing
                    ? "bg-[#72333B]"
                    : "bg-gray-400 shadow-none opacity-80"
                }`}
              >
                {isCheckedIn ? (
                  <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
                    <div className="bg-white/20 p-8 rounded-full border-4 border-white/10 shadow-inner">
                      <CheckCircle size={80} className="text-[#54AD9E]" />
                    </div>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">
                      Verified
                    </h4>
                    <p className="opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Logged into system
                    </p>
                  </div>
                ) : isOngoing ? (
                  <>
                    <h4 className="font-black text-2xl mb-8 uppercase tracking-tight leading-tight">
                      Live Session.
                      <br />
                      Confirm Presence.
                    </h4>
                    <button
                      onClick={handleCheckIn}
                      className="w-full max-w-[320px] py-6 bg-[#54AD9E] text-white font-black rounded-[35px] hover:bg-[#44907e] shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-lg"
                    >
                      CHECK IN NOW
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    <Lock size={60} className="opacity-30" />
                    <div className="space-y-1">
                      <p className="font-black uppercase tracking-widest text-xs opacity-60">
                        Register Locked
                      </p>
                      <p className="font-bold text-lg">
                        Opens at {displayLecture.startTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-20 text-center text-gray-400 font-black uppercase border-4 border-dashed rounded-[60px]">
              No active curriculum data found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-8 relative z-10">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="font-black text-base uppercase text-gray-800 tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

export default StudentDigitalRegister;
