import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/gateway");
  };

  // --- Dynamic Route Logic ---
  const getDashboardPath = () => {
    if (!user) return "/gateway";
    return `/${user.role}/dashboard`;
  };

  const getLibraryPath = () => {
    // If logged in as student, go to the protected portal, else go to the landing page
    return user?.role === "student"
      ? "/student/library-portal"
      : "/LibraryPortal";
  };

  return (
    <div className="bg-[#72333B] sticky top-0 z-50 shadow-md font-[Century Gothic]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img
            src="/homelogo.png"
            alt="University Logo"
            className="h-10 transition-transform hover:scale-105"
          />
        </Link>

        <div className="flex gap-8 text-[17px] text-white items-center">
          <Link
            to="/courses"
            className="hover:text-gray-300 transition-colors uppercase font-bold tracking-tighter"
          >
            A-Z Index
          </Link>
          <Link
            to="/community"
            className="hover:text-gray-300 transition-colors uppercase font-bold tracking-tighter"
          >
            Community
          </Link>
          <Link
            to={getLibraryPath()}
            className="hover:text-gray-300 transition-colors uppercase font-bold tracking-tighter"
          >
            Library
          </Link>

          {/* DYNAMIC DASHBOARD LINK */}
          {user && (
            <Link
              to={getDashboardPath()}
              className="text-[#F6D047] hover:text-white transition-colors uppercase font-black tracking-tighter border-b-2 border-[#F6D047]"
            >
              Dashboard
            </Link>
          )}

          {/* Login / Logout Toggle */}
          {!loading ? (
            user ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] uppercase font-black opacity-50 leading-none">
                    Logged in as
                  </p>
                  <p className="text-[12px] font-bold">
                    {user?.email ? user.email.split("@")[0] : "User"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#72333B] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/gateway"
                className="bg-white/10 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20"
              >
                Login
              </Link>
            )
          ) : (
            <div className="w-24 h-8 bg-white/5 animate-pulse rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
