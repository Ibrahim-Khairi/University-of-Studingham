import React from "react";

const lectures = [
  { day: "Monday", time: "9:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Monday", time: "10:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Monday", time: "12:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Monday", time: "13:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Tuesday", time: "11:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Tuesday", time: "14:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Tuesday", time: "15:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Wednesday", time: "9:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Wednesday", time: "10:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Wednesday", time: "12:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Wednesday", time: "13:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Thursday", time: "9:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Thursday", time: "10:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Thursday", time: "12:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Friday", time: "9:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Friday", time: "10:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
  { day: "Friday", time: "13:00", title: "Website Development", code: "CS-301", teacher: "Dr. Michael Owen", room: "FML-014" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const LecturesCalendar = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lectures</h2>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">&lt;</button>
          <span className="text-lg font-medium">Week 1 (Oct 12–18)</span>
          <button className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">&gt;</button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 border-b pb-2  font-medium text-gray-700">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-6  ">
        {/* Time Column */}
        <div className="flex flex-col  ">
          {times.map((time) => (
            <div key={time} className="text-sm border-b-2 border-gray-400 text-gray-600 h-30">{time}</div>
          ))}
        </div>

        {/* Days Columns */}
        {days.map((day) => (
          <div key={day} className="flex flex-col    ">
            {times.map((time) => {
              const lecture = lectures.find((lec) => lec.day === day && lec.time === time);
              return lecture ? (
                <div key={time} className="bg-white  h-30 shadow-md p-3  border-b-2 border-gray-400 hover:shadow-lg transition">
                  <h3 className="text-blue-600 font-medium">{lecture.title}</h3>
                  <p className="text-xs text-yellow-600">{lecture.code}</p>
                  <p className="text-sm text-gray-700">{lecture.teacher}</p>
                  <p className="text-xs text-gray-400">{lecture.room}</p>
                </div>
              ) : (
                <div key={time} className="h-30 border-b-2 border-gray-400"></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesCalendar;
