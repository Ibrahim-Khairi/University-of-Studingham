import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Import useAuth

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 2. Destructure user

  return (
    <div className="font-[Century Gothic]">
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="bg-cover bg-center min-h-[600px] flex items-center"
        style={{ backgroundImage: "url('/Images/Home/homebg.jpg')" }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 text-white">
          <div className="flex-1">
            <h1 className="text-[45px] md:text-[60px] font-black uppercase tracking-tighter leading-none mb-6 text-white">
              WHERE EXCELLENCE <br /> MEETS TRADITION
            </h1>

            <p className="max-w-[700px] text-lg opacity-90 leading-relaxed font-medium">
              At the University of Studingham, tradition and learning move
              together with quiet harmony. We honour the foundations that shaped
              us while inspiring students to explore new ideas, broaden their
              understanding, and pursue knowledge with purpose and clarity.
            </p>

            <div className="mt-12 flex gap-6">
              {/* 3. CONDITIONAL BUTTON: Only show if user is NOT logged in */}
              {!user && (
                <button
                  onClick={() => navigate("/student-registration")}
                  className="bg-[#4C86A8] px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#3b6b87] transition-all shadow-lg active:scale-95 text-white"
                >
                  Apply Now
                </button>
              )}

              <button
                onClick={() => navigate("/courses")}
                className="bg-[#407008] px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#325806] transition-all shadow-lg active:scale-95 text-white"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* RIGHT SIDE RANKINGS */}
          <div className="flex flex-col justify-center gap-10">
            <RankingItem
              img="/Images/Home/rankedcup1.png"
              text="Ranked #1 Virtual University in the UK"
            />
            <RankingItem
              img="/Images/Home/rankedcup2.png"
              text="Gold Tier Student Support"
            />
            <RankingItem
              img="/Images/Home/ranked3.png"
              text="Global Leader in Virtual Education"
            />
          </div>
        </div>
      </div>

      {/* 3 GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] text-white mx-auto my-20 px-4">
        {/* Card 1: Community */}
        <Link
          to="/community"
          className="relative bg-cover bg-center rounded-3xl h-[220px] p-8 group overflow-hidden shadow-xl"
          style={{ backgroundImage: "url('/Images/Home/upcommingevents.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <h3 className="text-[23px] font-black uppercase tracking-tight leading-none text-white">
              Upcoming Events & Announcements
            </h3>
            <div className="flex justify-end">
              <FaArrowRight className="text-[24px] group-hover:translate-x-2 transition-transform text-white" />
            </div>
          </div>
        </Link>

        {/* Card 2: Library Portal - DYNAMIC ROUTE */}
        <Link
          to={user ? "/student/library-portal" : "/LibraryPortal"}
          className="relative bg-cover bg-center rounded-3xl h-[220px] p-8 group overflow-hidden shadow-xl"
          style={{ backgroundImage: "url('/Images/Home/ourfacilities.png')" }}
        >
          <div className="absolute inset-0 bg-[#72333B]/60 group-hover:bg-[#72333B]/40 transition-all duration-500"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <h3 className="text-[23px] font-black uppercase tracking-tight leading-none text-white">
              Virtual Library <br /> & Research Portal
            </h3>
            <div className="flex justify-end">
              <FaArrowRight className="text-[24px] group-hover:translate-x-2 transition-transform text-white" />
            </div>
          </div>
        </Link>

        {/* Card 3: Community Page */}
        <Link
          to="/community"
          className="relative bg-cover bg-center rounded-3xl h-[220px] p-8 group overflow-hidden shadow-xl"
          style={{ backgroundImage: "url('/Images/Home/our community.png')" }}
        >
          <div className="absolute inset-0 bg-[#407008]/60 group-hover:bg-[#407008]/40 transition-all duration-500"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <h3 className="text-[23px] font-black uppercase tracking-tight leading-none text-white">
              Life Within Our <br /> Community
            </h3>
            <div className="flex justify-end">
              <FaArrowRight className="text-[24px] group-hover:translate-x-2 transition-transform text-white" />
            </div>
          </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

const RankingItem = ({ img, text }) => (
  <div className="flex items-center gap-6 group">
    <img
      className="w-[70px] h-[70px] group-hover:scale-110 transition-transform duration-500 shadow-xl rounded-full"
      src={img}
      alt="ranking"
    />
    <p className="text-xl font-black max-w-[250px] leading-tight uppercase tracking-tighter text-white">
      {text}
    </p>
  </div>
);

export default Home;
