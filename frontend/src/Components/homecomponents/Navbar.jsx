import React from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // logout() in your context already uses window.location.href,
    // but we add navigate here as a backup.
    navigate("/gateway");
  };

  // Construct the path dynamically: e.g., /student/dashboard or /tutor/dashboard
  const dashboardPath = user ? `/${user.role}/dashboard` : "/gateway";

  return (
    <div className="bg-[#72333B]">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/">
          <img src="./homelogo.png" alt="navbarlogo" className="h-10" />
        </Link>

        <div className="flex gap-6 text-[18px] text-white items-center font-[Century Gothic]">
          <Link to="/" className="hover:text-gray-300">
            A-Z
          </Link>
          <Link to="/community" className="hover:text-gray-300">
            Community
          </Link>
          <Link to="/LibraryPortal" className="hover:text-gray-300">
            Library
          </Link>

          {/* 1. Dynamic Dashboard Link based on Role */}
          {user && (
            <Link to={dashboardPath} className="hover:text-gray-300  ">
              Dashboard
            </Link>
          )}

          {/* 2. Login/Logout Toggle */}
          {!loading &&
            (user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-[#72333B] px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/gateway" className="hover:text-gray-300">
                Login
              </Link>
            ))}
=======
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#72333B]">
      <div className="container flex justify-between items-center py-4">
        <Link to="/">
          <img src="./homelogo.png" alt="navbarlogo" />
        </Link>
        <div className="flex gap-6 text-[18px] text-white">
          <Link to="/">A-Z</Link>
          <Link to="/community">Community</Link>
          <Link to="/LibraryPortal">Library</Link>
          <Link to="/gateway">Login</Link>
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
        </div>
      </div>
    </div>
  );
};

export default Navbar;
