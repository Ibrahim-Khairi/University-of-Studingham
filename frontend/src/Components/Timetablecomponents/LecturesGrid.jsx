import { useState } from "react";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const TIMES = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
];

export default function LecturesGrid({ lecturePattern, setLecturePattern }) {
    const [pending, setPending] = useState([]);

    /* ---------------- HELPERS ---------------- */

    const dayHasLecture = (day) =>
        lecturePattern.some(l => l.day === day);

    const lectureDaysCount = () =>
        new Set(lecturePattern.map(l => l.day)).size;

    const isOccupied = (day, index) =>
        lecturePattern.some(l => {
            if (l.day !== day) return false;
            const start = TIMES.indexOf(l.startTime);
            return index >= start && index < start + l.durationHours;
        });

    const isPending = (day, index) =>
        pending.some(p => p.day === day && p.index === index);

    /* ---------------- CLICK LOGIC ---------------- */

    const handleCellClick = (day, index) => {
        // ❌ Day already locked
        if (dayHasLecture(day)) return;

        // ❌ 3 lecture days already used
        if (!pending.length && lectureDaysCount() >= 3) return;

        if (isOccupied(day, index)) return;

        if (pending.length === 0) {
            setPending([{ day, index }]);
            return;
        }

        // must be same day
        if (pending[0].day !== day) {
            setPending([]);
            return;
        }

        const indices = pending.map(p => p.index).sort((a, b) => a - b);
        const min = indices[0];
        const max = indices[indices.length - 1];

        // must be contiguous
        if (index !== min - 1 && index !== max + 1) {
            setPending([]);
            return;
        }

        if (pending.length === 3) return;

        setPending([...pending, { day, index }]);
    };

    /* ---------------- CONFIRM ---------------- */

    const confirmLecture = () => {
        if (pending.length === 0) return;

        const sorted = pending.map(p => p.index).sort((a, b) => a - b);

        setLecturePattern(prev => [
            ...prev,
            {
                day: pending[0].day,
                startTime: TIMES[sorted[0]],
                durationHours: sorted.length
            }
        ]);

        setPending([]);
    };

    /* ---------------- DELETE ---------------- */

    const deleteDay = (day) => {
        setLecturePattern(prev => prev.filter(l => l.day !== day));
        setPending([]);
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="select-none space-y-4">

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={confirmLecture}
                    disabled={pending.length === 0}
                    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-40"
                >
                    Confirm Lecture
                </button>

                {DAYS.map(day => (
                    <button
                        key={day}
                        onClick={() => deleteDay(day)}
                        disabled={!dayHasLecture(day)}
                        className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-40"
                    >
                        Delete {day}
                    </button>
                ))}
            </div>

            {/* Header */}
            <div className="grid grid-cols-[80px_repeat(5,1fr)]">
                <div />
                {DAYS.map(day => (
                    <div key={day} className="border bg-blue-100 text-center py-2 font-semibold">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            {TIMES.map((time, index) => (
                <div key={time} className="grid grid-cols-[80px_repeat(5,1fr)]">
                    <div className="border bg-gray-100 text-center py-2">{time}</div>

                    {DAYS.map(day => {
                        const locked = dayHasLecture(day);

                        return (
                            <div
                                key={`${day}-${time}`}
                                onClick={() => handleCellClick(day, index)}
                                className={`
                  border h-12 cursor-pointer transition
                  ${isOccupied(day, index) ? "bg-blue-600" : ""}
                  ${isPending(day, index) ? "bg-blue-300" : ""}
                  ${!locked && !isOccupied(day, index) && !isPending(day, index)
                                    ? "hover:bg-blue-50"
                                    : ""}
                  ${locked && !isOccupied(day, index) ? "bg-gray-200 cursor-not-allowed" : ""}
                `}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}