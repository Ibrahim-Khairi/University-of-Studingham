import React from "react";
import "../styles/Courses.css";
import Courseslist from "../components/coursecomponents/Courseslist";
const Courses = () => {
  return (
    <div>
      <div className="courses_main  text-center px-4 md:px-10 lg:px-20 py-10 bg-white">
        <h1 className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[100px]  text-gray-900">
          Business & Management
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nam
          temporibus autem doloribus corporis, facere voluptatum voluptatem
          animi nisi praesentium dolore. Repellendus cupiditate veritatis
          quisquam corrupti sed reiciendis nostrum vel.
        </p>
      </div>
      <Courseslist></Courseslist>
    </div>
  );
};

export default Courses;
