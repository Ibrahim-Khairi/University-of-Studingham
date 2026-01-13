import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AZIndex = () => {
  const [courses, setCourses] = useState([]);
  const [filteredLetter, setFilteredLetter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/setup/courses");
        // Sort courses alphabetically by name
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setCourses(sorted);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Helper to group courses by their first letter
  const groupedCourses = courses.reduce((acc, course) => {
    const firstLetter = course.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(course);
    return acc;
  }, {});

  // Determine which letters to show based on filter
  const displayedLetters =
    filteredLetter === "ALL"
      ? Object.keys(groupedCourses).sort()
      : [filteredLetter];

  if (loading)
    return (
      <div className="text-center py-20 opacity-50 font-bold">
        LOADING INDEX...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
      <h2 className="text-5xl font-black mb-10 text-gray-900 tracking-tighter">
        FULL A-Z INDEX
      </h2>

      {/* Alphabet Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-16 items-center border-b border-gray-100 pb-8">
        <button
          onClick={() => setFilteredLetter("ALL")}
          className={`px-6 py-2 rounded-md font-black text-sm transition-all ${
            filteredLetter === "ALL"
              ? "bg-[#1B4F72] text-white shadow-lg"
              : "text-[#1B4F72] hover:bg-gray-50"
          }`}
        >
          ALL
        </button>
        {alphabet.map((char) => {
          const hasCourses = groupedCourses[char];
          return (
            <button
              key={char}
              disabled={!hasCourses}
              onClick={() => setFilteredLetter(char)}
              className={`text-lg font-bold transition-all ${
                !hasCourses
                  ? "text-gray-200 cursor-not-allowed"
                  : filteredLetter === char
                  ? "text-[#1B4F72] border-b-4 border-[#1B4F72] scale-125"
                  : "text-[#1B4F72] hover:scale-110"
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Course List Content */}
      <div className="space-y-12">
        {displayedLetters.map((letter) => (
          <div key={letter} className="group">
            {groupedCourses[letter] && (
              <>
                <h3 className="text-3xl font-black text-gray-900 mb-6 border-l-8 border-[#72333B] pl-4">
                  {letter}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                  {groupedCourses[letter].map((course) => (
                    <li key={course._id} className="flex items-center gap-3">
                      {/* Custom Bullet Point matching the image style */}
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                      <Link
                        to={`/course/${course._id}`}
                        className="text-[18px] font-medium text-gray-700 hover:text-[#72333B] hover:underline transition-colors decoration-2 underline-offset-4"
                      >
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}

        {/* Empty State if specific letter has no data */}
        {filteredLetter !== "ALL" && !groupedCourses[filteredLetter] && (
          <div className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-3xl">
            No courses found starting with {filteredLetter}
          </div>
        )}
      </div>
    </div>
  );
};

export default AZIndex;
