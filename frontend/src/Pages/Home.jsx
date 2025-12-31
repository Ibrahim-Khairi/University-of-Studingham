import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('./Images/Home/homebg.jpg')" }}
      >
        <div className="container py-50 flex gap-10 text-white">
          <div>
            <h1 className="text-[45px] font-bold">
              WHERE EXCELLENCE MEETS TRADITION
            </h1>

            <p className="max-w-[700px]">
              At the University of Studingham, tradition and learning move
              together with quiet harmony. We honour the foundations that shaped
              us while inspiring students to explore new ideas, broaden their
              understanding, and pursue knowledge with purpose and clarity.
            </p>

            <div className="mt-20 flex gap-4">
              <button className="bg-[#4C86A8] px-6 py-2 rounded-xs">
                Apply Now
              </button>

              <button className="bg-[#407008] px-6 py-2 rounded-xs">
                Explore Courses
              </button>
            </div>
          </div>

          {/* RIGHT SIDE RANKINGS */}
          <div>
            <div className="flex gap-4 mb-8">
              <img
                className="w-[80px] h-[80px]"
                src="./Images/Home/rankedcup1.png"
                alt="ranked cup"
              />
              <p className="text-2xl font-bold max-w-[300px]">
                Ranked Virtual University in the UK
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <img
                className="w-[80px] h-[80px]"
                src="./Images/Home/rankedcup2.png"
                alt="ranked cup"
              />
              <p className="text-2xl font-bold max-w-[300px]">
                Student Support in the UK
              </p>
            </div>
            <div className="flex gap-4 mb-8">
              <img
                className="w-[80px] h-[80px]"
                src="./Images/Home/ranked3.png"
                alt="ranked cup"
              />
              <p className="text-2xl font-bold max-w-[300px]">
                Virtual Universities Worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 GRID CARDS */}
      <div className="grid grid-cols-3 gap-10 max-w-[1000px] text-white mx-auto my-10">
        <div
          className="bg-cover bg-center p-4"
          style={{
            backgroundImage: "url(' /Images/Home/upcommingevents.png')",
          }}
        >
          <h3 className="text-[23px] font-bold">
            Upcoming Events & Announcements
          </h3>
          <div className="flex justify-end mt-4">
            <FaArrowRight className="text-[20px]" />
          </div>
        </div>

        <div
          className="bg-cover bg-center p-4"
          style={{
            backgroundImage: "url(' /Images/Home/ourfacilities.png')",
          }}
        >
          <h3 className="text-[23px] font-bold">
            A Look Into <br /> Our Faculties
          </h3>
          <div className="flex justify-end mt-4">
            <FaArrowRight className="text-[20px]" />
          </div>
        </div>

        <div
          className="bg-cover bg-center bg-blend-color-burn bg-[#919191] p-4"
          style={{
            backgroundImage: "url(' /Images/Home/our community.png')",
          }}
        >
          <h3 className="text-[23px] font-bold">
            Life Within Our <br /> Community
          </h3>
          <div className="flex justify-end mt-4">
            <FaArrowRight className="text-[20px]" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
