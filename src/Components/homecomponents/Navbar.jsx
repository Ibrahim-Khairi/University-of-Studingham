import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#72333B]">
      <div className="container flex justify-between items-center py-4">
        <img src="./homelogo.png" alt="navbarlogo" />
        <div className="flex gap-6 text-[18px] text-white">
          <Link to="/">A-Z</Link>
          <Link to="/news">News</Link>
          <Link to="/community">Community</Link>
          <Link to="/library">Library</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
