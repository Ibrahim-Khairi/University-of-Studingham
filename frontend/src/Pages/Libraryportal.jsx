import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Libraryportal = () => {
  const { user, loading } = useAuth();

  // Logic to determine where the button takes the user
  const targetPath = user ? "/student/library-collection" : "/login";
  const buttonLabel = user ? "Access Library" : "Log In";

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat p-5 text-white"
      style={{
        // FIXED: Removed the dot. Path now starts from root public folder
        backgroundImage: "url('/libraryimg.png')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center flex-col items-center text-center h-full font-[Century Gothic]">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <img
              // FIXED: Removed the dot. Path now starts from root public folder
              src="/websitelogo.png"
              alt="University Logo"
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-[30px] md:text-[35px] font-black uppercase tracking-tighter max-w-xs leading-none">
              University of Studingham
            </h1>
          </div>

          <div className="p-5 mt-6">
            <h3 className="text-[35px] md:text-[50px] font-black text-[#388F96] mb-4 uppercase tracking-tighter">
              Library Overview
            </h3>
            <p className="max-w-[650px] text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              The University of Studingham Virtual Library is a digital gateway
              to knowledge, providing students and faculty with seamless access
              to e-books, journals, and research databases. Designed for
              flexible, online learning, it connects the Studingham community to
              academic resources anytime, anywhere.
            </p>

            {/* Programmatic Button */}
            {!loading ? (
              <Link
                className="bg-[#C87E3C] hover:bg-[#b06d32] transition-all px-16 py-5 text-white font-black uppercase text-sm tracking-[0.2em] inline-block rounded-full mt-10 shadow-2xl hover:scale-105 active:scale-95"
                to={targetPath}
              >
                {buttonLabel}
              </Link>
            ) : (
              <div className="bg-white/10 w-[200px] h-[58px] rounded-full mx-auto mt-10 animate-pulse border border-white/5" />
            )}

            {user && (
              <p className="mt-4 text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                Logged in as: {user.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Libraryportal;
