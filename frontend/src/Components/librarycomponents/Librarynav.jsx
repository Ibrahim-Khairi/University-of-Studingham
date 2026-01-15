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
              to="/student/library-portal"
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

      <div className="flex justify-center my-8">
        <div className="relative w-[450px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width={18}
              height={18}
              viewBox="0 0 29 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2083 0C5.02469 0 0 5.44167 0 12.1385C0 18.8353 5.02469 24.277 11.2083 24.277C13.655 24.277 15.9162 23.4235 17.7603 21.9787L26.4343 31.3503L28.2887 29.3421L19.7176 20.0374C21.4019 17.9121 22.4166 15.1536 22.4166 12.1385C22.4166 5.44167 17.392 0 11.2083 0ZM11.2083 1.42806C16.6786 1.42806 21.098 6.21427 21.098 12.1385C21.098 18.0627 16.6786 22.8489 11.2083 22.8489C5.73809 22.8489 1.31863 18.0627 1.31863 12.1385C1.31863 6.21427 5.73809 1.42806 11.2083 1.42806Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <input
            type="text"
            className="border-2 border-gray-100 bg-[#F7F7F8] rounded-2xl pl-12 pr-4 py-3 w-full font-bold text-sm focus:border-[#72333B] outline-none transition-all"
            placeholder="Search by keyword/title/author/ISBN"
          />
        </div>
      </div>
    </div>
  );
};

export default Librarynav;
