import React from "react";
import "../styles/Courses.css";
import Courselist from "../Components/CourseComponents/Courselist";
const Courses = () => {
  return (
    <div>
      <div className="courses_main text-center px-4 md:px-10 lg:px-20 py-10 bg-white">
        <h1 className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[100px] text-gray-900">
          Business & Management
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          The concepts of organizing, leading, planning, and managing business
          operations are examined in this course.
        </p>
      </div>
      <Courselist></Courselist>
    </div>
  );
};

export default Courses;
