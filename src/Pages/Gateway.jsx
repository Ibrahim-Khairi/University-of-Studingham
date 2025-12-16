import React from "react";
import { IoLibraryOutline } from "react-icons/io5";
const Gateway = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url('/gatewaybg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      ></div>

      <div className="relative z-10 container">
        <div className="flex items-center gap-5 mt-5">
          <div className="bg-white w-auto rounded-full">
            <img src="/websitelogo.png" alt="/websitelogo" />
          </div>
          <h2 className="text-4xl max-w-[400px] font-bold text-[#190C4A]">
            University of Studingham
          </h2>
        </div>
        <div
          className="rounded-4xl p-12 mt-16"
          style={{
            backgroundImage: "url('/gatewaybgimg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className=" text-white  flex gap-8
          "
          >
            <div className="cursor-pointer">
              <img src="/gatewaystudent.png" className="h-[60px]" alt="" />
              <h3 className="text-3xl mt-4 uppercase">Student Login</h3>
              <p className="mt-2">Access your Student Dashboard</p>
            </div>
            <div className="cursor-pointer">
              <img src="/gatewaystaff.png" className="h-[60px]" alt="" />
              <h3 className="text-3xl mt-4 uppercase">Staff Login</h3>
              <p className="mt-2">Access your Teaching Dashboard</p>
            </div>
            <div className="cursor-pointer">
              <img src="/gatewayadmin.png" className="h-[60px]" alt="" />
              <h3 className="text-3xl mt-4 uppercase">Admin Login</h3>
              <p className="mt-2">Access your Administrative Controls</p>
            </div>
            <div className="ml-18">
              <img src="gatewayloginlogo.png" alt="" />
            </div>
          </div>
          <div>
            <button className="bg-[#AD2F39] mt-10 uppercase text-white rounded-4xl py-4 px-8">
              Go To Login
            </button>
          </div>
        </div>
        <div
          className="rounded-4xl p-8 mt-16 text-white flex gap-4 mb-10"
          style={{
            backgroundImage: "url('/librarybgimg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <IoLibraryOutline className="text-[100px]" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">Library portal</h3>
            <p>
              Explore academic resources to enhance your learning, access
              research materials, study guides, scholarly articles, and
              interactive tools that support knowledge development, critical
              thinking, and overall academic success in every field of study.
            </p>
            <button className="bg-[#2F5028] mt-4 uppercase text-white rounded-4xl py-4 px-8">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gateway;
