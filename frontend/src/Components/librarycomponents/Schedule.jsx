import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

const schedule = {
  Monday: { "9:00": "red", "10:00": "red", "11:00": "", "12:00": "green" },
  Tuesday: { "9:00": "red", "10:00": "", "11:00": "red", "13:00": "red" },
  Wednesday: { "9:00": "red", "10:00": "red", "11:00": "red", "14:00": "red" },
  Thursday: { "9:00": "red", "10:00": "", "13:00": "green", "15:00": "green" },
  Friday: {
    "10:00": "",
    "11:00": "red",
    "12:00": "red",
    "14:00": "red",
    "15:00": "red",
  },
};

const Schedule = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div className="grid grid-cols-6 border border-gray-300">
        {/* Header Row */}
        <div className="border border-gray-300 p-2 bg-white font-bold"></div>
        {days.map((d) => (
          <div
            key={d}
            className="border border-gray-300 p-2 font-bold text-center"
          >
            {d}
          </div>
        ))}

        {/* Time + Slots */}
        {times.map((time) => (
          <>
            <div
              key={time}
              className="border border-gray-300 p-2 font-semibold text-center bg-gray-100"
            >
              {time}
            </div>

            {days.map((day) => {
              const status = schedule[day]?.[time] || "";
              return (
                <div
                  key={`${day}-${time}`}
                  className={`border border-gray-300 h-12 ${
                    status === "red"
                      ? "bg-[#CE4C5D]"
                      : status === "green"
                      ? "bg-[#34D960]"
                      : ""
                  }`}
                ></div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
