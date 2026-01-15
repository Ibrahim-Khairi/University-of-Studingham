import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import AZIndex from "../components/coursecomponents/AZIndex";
import Footer from "../components/homecomponents/Footer";

const Courses = () => {
  return (
    <div className="bg-[#F9F9F9] min-h-screen font-[Century Gothic]">
      <Navbar></Navbar>
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 text-center px-4 md:px-10 lg:px-20 py-16">
        <h1 className="text-[40px] sm:text-[60px] lg:text-[80px] font-black text-gray-900 tracking-tighter uppercase leading-none mb-6">
          Find Your Course
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Explore our wide range of undergraduate and postgraduate programs. Use
          the A-Z index below to find the specific field of study that matches
          your career goals.
        </p>
      </div>

      {/* A-Z Index Component */}
      <div className="container mx-auto px-4 md:px-20 py-12">
        <AZIndex />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Courses;
