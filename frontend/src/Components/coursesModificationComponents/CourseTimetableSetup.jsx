import { useState } from "react";
import LecturesGrid from "../Timetablecomponents/LecturesGrid.jsx";

const YEARS = [1, 2, 3];
const MODULES_PER_YEAR = 4;

export default function CourseTimetableSetup({ modules, onComplete }) {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const [lecturePatternsByModule, setLecturePatternsByModule] = useState([]);
  const [lecturePattern, setLecturePattern] = useState([]);

  const currentYear = YEARS[currentYearIndex];
  const currentModuleNumber = currentModuleIndex + 1;

  const resolveModuleId = (year, moduleIndex) => {
    const key = `year${year}`;
    return modules[key]?.[moduleIndex]?.id || null;
  };

  const getWeekBlockForModule = (moduleIndex) => {
    const start = moduleIndex * 8 + 1;
    return { start, end: start + 7 };
  };

  const handleConfirmModule = () => {
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
        courseId: null,
        moduleId,
        year: currentYear,
        weekBlock,
        pattern: lecturePattern,
      },
    ];

    setLecturePatternsByModule(updated);
    setLecturePattern([]);

    // move forward
    if (currentModuleIndex < MODULES_PER_YEAR - 1) {
      setCurrentModuleIndex((prev) => prev + 1);
    } else if (currentYearIndex < YEARS.length - 1) {
      setCurrentModuleIndex(0);
      setCurrentYearIndex((prev) => prev + 1);
    } else {
      // 🎯 DONE — return data to parent
      onComplete(updated);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Year {currentYear} — Module {currentModuleNumber}
        </h2>

        <span className="text-sm text-gray-500">
          Weeks {getWeekBlockForModule(currentModuleIndex).start}–
          {getWeekBlockForModule(currentModuleIndex).end}
        </span>
      </div>

      <LecturesGrid
        lecturePattern={lecturePattern}
        setLecturePattern={setLecturePattern}
      />

      <div className="flex justify-end">
        <button
          onClick={handleConfirmModule}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
        >
          Confirm Module Lectures
        </button>
      </div>
    </div>
  );
}
