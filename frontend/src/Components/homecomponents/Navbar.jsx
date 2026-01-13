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

  const getDashboardPath = () => {
    if (!user || !user.role) return "/gateway";
    return `/${user.role}/dashboard`;
  };

  return (
    <div className="bg-[#72333B] sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo - Using absolute path / to ensure it works on sub-routes */}
        <Link to="/">
          <img src="/homelogo.png" alt="University Logo" className="h-10" />
        </Link>

        <div className="flex gap-8 text-[18px] text-white items-center font-[Century Gothic]">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            A-Z
          </Link>
          <Link
            to="/community"
            className="hover:text-gray-300 transition-colors"
          >
            Community
          </Link>
          <Link
            to="/LibraryPortal"
            className="hover:text-gray-300 transition-colors"
          >
            Library
          </Link>

          {/* 1. Dynamic Dashboard Link: Shows only if user is logged in */}
          {user && (
            <Link
              to={getDashboardPath()}
              className="hover:text-gray-300 font-bold border-b-2 border-transparent hover:border-white transition-all"
            >
              Dashboard
            </Link>
          )}

          {/* 2. Login/Logout Toggle */}
          {!loading ? (
            user ? (
              <div className="flex items-center gap-4">
                {/* Optional: Show user email or name for a professional look */}
                <span className="text-xs opacity-70 hidden md:block">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#72333B] px-6 py-1.5 rounded-full font-black hover:bg-gray-200 transition-all cursor-pointer active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/gateway"
                className="bg-white/10 px-6 py-1.5 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Login
              </Link>
            )
          ) : (
            /* Loading state for the buttons */
            <div className="w-20 h-8 bg-white/5 animate-pulse rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
