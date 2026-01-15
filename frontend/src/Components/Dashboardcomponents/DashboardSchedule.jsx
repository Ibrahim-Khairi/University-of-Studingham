import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardSchedule = () => {
  const [allLectures, setAllLectures] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("Emails");

  // State to track the currently viewed week
  const [currentWeek, setCurrentWeek] = useState(1);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000/api";

  // 1. ACADEMIC CALENDAR LOGIC
  // Your backend uses 2025-09-22 as the start of Week 1
  const ACADEMIC_YEAR_START = new Date("2025-09-22");

  const calculateCurrentAcademicWeek = () => {
    const today = new Date();

    // If today is before the start date, return week 1
    if (today < ACADEMIC_YEAR_START) return 1;

    const msecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const diff = today.getTime() - ACADEMIC_YEAR_START.getTime();

    // Calculate week number (e.g., day 1-7 = Week 1)
    const week = Math.ceil((diff + 1) / msecondsInWeek);

    // Cap it between Week 1 and 32 (standard academic year)
    return Math.max(1, Math.min(week, 32));
  };

  useEffect(() => {
    // On first load, set the view to the actual current week
    const realWeek = calculateCurrentAcademicWeek();
    setCurrentWeek(realWeek);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const lecRes = await axios.get(`${BASE_URL}/timetable/tutor`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lectures = lecRes.data.lectures || [];

      // Chronological Sort (By Date, then Time)
      const sortedLectures = lectures.sort((a, b) => {
        if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
        return a.startTime.localeCompare(b.startTime);
      });

      setAllLectures(sortedLectures);

      const taskRes = await axios.get(`${BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(taskRes.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  // Filter lectures for the selected week
  const filteredByWeek = allLectures.filter(
    (l) => l.weekNumber === currentWeek
  );

  const handleNextWeek = () => setCurrentWeek((prev) => Math.min(prev + 1, 32));
  const handlePrevWeek = () => setCurrentWeek((prev) => Math.max(prev - 1, 1));

  const handleAddTask = async () => {
    if (!taskTitle) return;
    try {
      await axios.post(
        `${BASE_URL}/tasks`,
        { title: taskTitle, category: taskCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/tasks/toggle/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const scheduleColors = ["bg-[#4C86A8]", "bg-[#407008]", "bg-[#8E3B46]"];
  const taskColors = {
    Emails: "#EB4239",
    Meetings: "#5FC55F",
    Preparations: "#F89631",
    Grading: "#1C7EDF",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8 font-[Century Gothic]">
      {/* LEFT SIDE: WEEK-WISE ACADEMIC SCHEDULE */}
      <div className="flex flex-col">
        <div className="bg-white rounded-2xl items-center p-5 flex justify-between gap-4 shadow-sm mb-6">
          <div className="flex gap-6 items-center">
            <div className="bg-[#1761EB] rounded-2xl h-[50px] w-[18px]"> </div>
            <div>
              <h2 className="text-[22px] font-black uppercase tracking-tighter">
                Academic Schedule
              </h2>
              <p className="text-[#626262] font-bold text-[10px] uppercase tracking-widest">
                Displaying: Week {currentWeek}
                {currentWeek === calculateCurrentAcademicWeek() && " (Current)"}
              </p>
            </div>
          </div>

          {/* WEEK NAVIGATION CONTROLS */}
          <div className="flex gap-3 items-center">
            <button
              onClick={handlePrevWeek}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredByWeek.length > 0 ? (
            filteredByWeek.map((lec, index) => (
              <div
                key={lec._id}
                className={`${
                  scheduleColors[index % 3]
                } text-white rounded-[25px] items-center p-5 flex gap-6 shadow-md transition-all hover:translate-x-1`}
              >
                <div className="border-r-2 border-white/20 pr-6 text-center min-w-[90px]">
                  <div className="font-black text-xl leading-none mb-1">
                    {lec.startTime}
                  </div>
                  <div className="text-[10px] font-black opacity-80 uppercase tracking-tighter">
                    {new Date(lec.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                </div>
                <div className="overflow-hidden w-full">
                  <div className="flex justify-between items-start">
                    <p className="font-black text-[17px] leading-tight uppercase truncate mr-2">
                      {lec.moduleId?.name || "Lecture"}
                    </p>
                    <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
                      Year {lec.year}
                    </span>
                  </div>
                  <p className="text-white/70 text-[10px] uppercase font-black tracking-[0.1em] mt-2">
                    Room {lec.room || "TBA"} • {lec.day}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 bg-white rounded-[40px] text-center border-4 border-dashed border-gray-100">
              <p className="text-gray-300 font-black uppercase text-xs tracking-widest italic">
                No Lectures scheduled for Week {currentWeek}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: TUTOR TASKS */}
      <div className="bg-white rounded-[45px] p-8 shadow-sm flex flex-col h-fit">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[24px] font-black uppercase tracking-tighter">
            Tutor Tasks
          </h3>
          <div className="bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black uppercase text-gray-400">
            Memory Bank
          </div>
        </div>

        <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[25px] hover:bg-gray-50 transition-colors group"
            >
              <div className="flex gap-4 items-center">
                <div
                  style={{
                    backgroundColor: taskColors[task.category] || "#EB4239",
                  }}
                  className="rounded-full h-[45px] w-[14px] shadow-sm"
                ></div>
                <div>
                  <h3
                    className={`text-[17px] font-bold leading-tight ${
                      task.completed
                        ? "line-through opacity-30"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                    {task.category}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
                className="w-7 h-7 accent-[#407008] cursor-pointer rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(taskColors).map((cat) => (
              <button
                key={cat}
                onClick={() => setTaskCategory(cat)}
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border-2 ${
                  taskCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-gray-300 border-gray-100 hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder={`Add to ${taskCategory.toLowerCase()}...`}
              className="flex-1 bg-gray-50 rounded-2xl px-6 py-4 outline-none font-bold text-sm focus:ring-2 ring-gray-100 transition-all"
            />
            <button
              onClick={handleAddTask}
              className="bg-black text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSchedule;
