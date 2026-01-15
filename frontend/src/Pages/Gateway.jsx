import React from "react";
import { IoLibraryOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Gateway = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/gatewaybg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Logo and Header */}
        <div className="flex items-center gap-5 pt-5">
          <Link className="flex items-center gap-5" to="/">
            <div className="bg-white w-[100px] md:w-[120px] rounded-full p-2">
              <img
                src="/websitelogo.png"
                alt="Website Logo"
                className="w-full"
              />
            </div>
            <h2 className="text-2xl md:text-4xl max-w-[400px] font-bold text-[#190C4A]">
              University of Studingham
            </h2>
          </Link>
        </div>

        {/* Registration Section */}
        <div
          className="rounded-4xl p-8 md:p-12 mt-16"
          style={{
            backgroundImage: "url('/gatewaybgimg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Student Link - UPDATED PATH */}
            <div className="flex flex-col">
              <img
                src="/gatewaystudent.png"
                className="h-[60px] w-fit mb-4"
                alt="Student"
              />
              <Link
                to="/student-registration"
                className="text-2xl font-bold uppercase hover:underline decoration-2"
              >
                Student Register
              </Link>
              <p className="mt-2 text-sm opacity-90">
                Access your Student Dashboard
              </p>
            </div>

            {/* Staff Link - UPDATED PATH */}
            <div className="flex flex-col">
              <img
                src="/gatewaystaff.png"
                className="h-[60px] w-fit mb-4"
                alt="Staff"
              />
              <Link
                to="/tutor-registration"
                className="text-2xl font-bold uppercase hover:underline decoration-2"
              >
                Staff Register
              </Link>
              <p className="mt-2 text-sm opacity-90">
                Access your Teaching Dashboard
              </p>
            </div>

            {/* Admin Link - UPDATED PATH */}
            <div className="flex flex-col">
              <img
                src="/gatewayadmin.png"
                className="h-[60px] w-fit mb-4"
                alt="Admin"
              />
              <Link
                to="/admin-registration"
                className="text-2xl font-bold uppercase hover:underline decoration-2"
              >
                Admin Register
              </Link>
              <p className="mt-2 text-sm opacity-90">
                Access your Administrative Controls
              </p>
            </div>

            {/* Logo placeholder */}
            <div className="hidden md:flex justify-end items-center h-full">
              <img
                src="/gatewayloginlogo.png"
                className="h-[120px]"
                alt="Login Logo"
              />
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/login"
              className="bg-[#AD2F39] inline-block uppercase text-white font-bold rounded-4xl py-4 px-10 hover:bg-[#8e252e] transition-colors"
            >
              Go To Login
            </Link>
          </div>
        </div>

        {/* Library Portal Section */}
        <div
          className="rounded-4xl p-8 mt-16 text-white flex flex-col md:flex-row gap-6 mb-10"
          style={{
            backgroundImage: "url('/librarybgimg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-shrink-0">
            <IoLibraryOutline className="text-[80px] md:text-[100px]" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">Library portal</h3>
            <p className="opacity-90 leading-relaxed">
              Explore academic resources to enhance your learning, access
              research materials, study guides, scholarly articles, and
              interactive tools that support knowledge development, critical
              thinking, and overall academic success in every field of study.
            </p>
            <Link
              to="/LibraryPortal"
              className="bg-[#2F5028] inline-block mt-6 uppercase text-white font-bold rounded-4xl py-4 px-10 hover:bg-[#233d1e] transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gateway;
