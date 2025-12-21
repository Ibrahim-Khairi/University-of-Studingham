import React from "react";
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
