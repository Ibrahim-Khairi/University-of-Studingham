import { useState } from "react";
import LecturesGrid from "../Timetablecomponents/LecturesGrid.jsx";

const YEARS = [1, 2, 3];
const MODULES_PER_YEAR = 4;

export default function CourseTimetableSetup({ selectedCourse, modules, onComplete }) {
    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

    const [lecturePatternsByModule, setLecturePatternsByModule] = useState([]);
    const [lecturePattern, setLecturePattern] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const currentYear = YEARS[currentYearIndex];
    const currentModuleNumber = currentModuleIndex + 1;

    const resolveModuleId = (year, moduleIndex) => {
        const module = modules[`year${year}`]?.[moduleIndex];
        if (!module) return null;

        // If _id exists (editing), return it
        if (module._id) return module._id;

        // If creating new course, temporarily allow using a placeholder
        if (!selectedCourse) return `temp-${year}-${moduleIndex}`;

        return null; // fallback
    }

    const getWeekBlockForModule = (moduleIndex) => {
        const start = moduleIndex * 8 + 1;
        return { start, end: start + 7 };
    };

    const handleConfirmModule = () => {
        if (!selectedCourse?._id) {
            alert("Course not found. Please save the course first.");
            return;
        }

        const moduleId = resolveModuleId(currentYear, currentModuleIndex);

        if (!moduleId) {
            alert("Module not found. Please save Modules first");
            return;
        }

        if (lecturePattern.length === 0) {
            alert("Please create a lecture pattern first");
            return;
        }

        const weekBlock = getWeekBlockForModule(currentModuleIndex);

        const updated = [
            ...lecturePatternsByModule,
            {
                courseId: selectedCourse._id || null,
                moduleId,
                year: currentYear,
                weekBlock,
                pattern: lecturePattern
            }
        ];

        setLecturePatternsByModule(updated);
        setLecturePattern([]);

        // move forward
        if (currentModuleIndex < MODULES_PER_YEAR - 1) {
            setCurrentModuleIndex(prev => prev + 1);
        } else if (currentYearIndex < YEARS.length - 1) {
            setCurrentModuleIndex(0);
            setCurrentYearIndex(prev => prev + 1);
        } else {
            // DONE — return data to parent and mark complete so UI doesn't reopen last step empty
            setIsComplete(true);
            onComplete(updated);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    {isComplete ? "All modules configured" : `Year ${currentYear} — Module ${currentModuleNumber}`}
                </h2>

                {!isComplete && (
                    <span className="text-sm text-gray-500">
                        Weeks {getWeekBlockForModule(currentModuleIndex).start}
                        –
                        {getWeekBlockForModule(currentModuleIndex).end}
                    </span>
                )}
            </div>

            {!isComplete ? (
                <LecturesGrid
                    lecturePattern={lecturePattern}
                    setLecturePattern={setLecturePattern}
                />
            ) : (
                <div className="p-4 rounded-xl bg-green-50 text-green-800">
                    Timetable setup is complete for all modules. You can now click "Save Course" below.
                </div>
            )}

            {!isComplete && (
                <div className="flex justify-end">
                    <button
                        onClick={handleConfirmModule}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
                    >
                        Confirm Module Lectures
                    </button>
                </div>
            )}
        </div>
    );
}