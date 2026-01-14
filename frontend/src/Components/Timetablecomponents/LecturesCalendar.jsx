import React, { useMemo } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const LecturesCalendar = ({ lectures, week, onWeekChange, academicYearStart, minWeek = 1, maxWeek = 32 }) => {
    console.log("LecturesCalendar lectures length:", lectures?.length);
    console.log("LecturesCalendar week:", week);
    console.log("Sample lecture:", lectures?.[0]);

    const getWeekRange = (week, academicYearStart) => {
        if (!academicYearStart) return "";

        const start = new Date(academicYearStart);
        start.setDate(start.getDate() + 7 * (week -1));
        const end = new Date(start);
        end.setDate(end.getDate() + 6);

        const options = { month: "short", day: "numeric" };
        return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
    }
    // Normalize + filter once
    const timetable = useMemo(() => {
        const map = {};

        lectures
            .filter(l => Number(l.week) === Number(week)) // ✅ FIXED
            .forEach(l => {
                const day = l.day;
                const time = l.time;

                if (!map[day]) map[day] = {};
                map[day][time] = l;
            });

        return map;
    }, [lectures, week]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Lectures</h2>

                <div className="flex items-center space-x-4">
                    <button
                        disabled={week === minWeek}
                        onClick={() => onWeekChange(week - 1)}
                        className={`px-3 py-1 rounded-full ${
                            week === minWeek ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        &lt;
                    </button>

                    <span className="text-lg font-medium">
                      Week {week} {academicYearStart && `(${getWeekRange(week, academicYearStart)})`}
                    </span>

                    <button
                        disabled={week === maxWeek}
                        onClick={() => onWeekChange(week + 1)}
                        className={`px-3 py-1 rounded-full ${
                            week === maxWeek ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-6 border-b pb-2 font-medium text-gray-700">
                <div></div>
                {days.map(day => (
                    <div key={day} className="text-center">{day}</div>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-6">
                {/* Time column */}
                <div className="flex flex-col">
                    {times.map(time => (
                        <div
                            key={time}
                            className="text-sm border-b-2 border-gray-400 text-gray-600 h-24 flex items-center"
                        >
                            {time}
                        </div>
                    ))}
                </div>

                {/* Day columns */}
                {days.map(day => (
                    <div key={day} className="flex flex-col">
                        {times.map(time => {
                            const lecture = timetable?.[day]?.[time];

                            return lecture ? (
                                <div
                                    key={time}
                                    className="bg-white h-24 shadow-md p-3 border-b-2 border-gray-400 hover:shadow-lg transition"
                                >
                                    <h3 className="text-blue-600 font-medium">{lecture.title}</h3>
                                    <p className="text-xs text-yellow-600">{lecture.code}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-700">{lecture.teacher}</p>
                                        <p className="text-xs text-gray-400">{lecture.room}</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={time}
                                    className="h-24 border-b-2 border-gray-400"
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LecturesCalendar;