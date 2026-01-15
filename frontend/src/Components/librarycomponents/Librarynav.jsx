import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Librarynav = () => {
  const { user } = useAuth();
  const BASE_URL = "http://localhost:5000";

  return (
    <div>
      <div className="bg-[#72333B]">
        <div className="flex justify-between text-white py-6 items-center container mx-auto px-4">
          <div>
            {/* ADDED: Link to the main library portal */}
            <Link
              to="/"
              className="text-[28px] font-black uppercase tracking-tighter"
            >
              Studingham Library
            </Link>
          </div>

          <div className="flex gap-8 items-center font-bold">
            <Link
              to="/student/library-collection"
              className="text-[18px] hover:opacity-80 transition-opacity"
            >
              Collection
            </Link>
            {/* ENSURE: This matches the path in your App.jsx */}
            <Link
              to="/student/library-history"
              className="text-[18px] hover:opacity-80 transition-opacity"
            >
              Personal History
            </Link>{" "}
            {/* UPDATED: Profile Image with dynamic URL */}
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 bg-gray-500 shadow-lg">
              {user?.picture ? (
                <img
                  src={`${BASE_URL}${user.picture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=User&background=666&color=fff";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-white/50 uppercase">
                  N/A
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Librarynav;
