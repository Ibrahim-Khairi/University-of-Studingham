import React from "react";
import Librarynav from "../components/librarycomponents/Librarynav";
import Schedule from "../components/librarycomponents/Schedule";
import Scheduleheader from "../components/librarycomponents/Scheduleheader";
const Mentorship = () => {
  return (
    <div>
      <Librarynav />

      <div className="grid grid-cols-[1fr_2fr_1fr] container">
        <div className="mt-10">
          <div className="flex justify-between  px-4 ">
            <form
              action=""
              className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-sm gap-4"
            >
              {/* Tutor Selection */}
              <label className="text-gray-600 font-semibold text-sm">
                Tutor Selection
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Select a Tutor</option>
              </select>

              {/* Date Selection */}
              <label className="text-gray-600 font-semibold text-sm">
                Date Selection
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Select a Date</option>
              </select>

              {/* Time Slot Selection */}
              <label className="text-gray-600 font-semibold text-sm">
                Time Slot Selection
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Select a Time Slot</option>
              </select>

              {/* Duration Selection */}
              <label className="text-gray-600 font-semibold text-sm">
                Duration Selection
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Select a Duration</option>
              </select>

              {/* Platform Selection */}
              <label className="text-gray-600 font-semibold text-sm">
                Platform Selection
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring focus:ring-blue-200">
                <option value="">Select a Platform</option>
              </select>

              {/* Meeting Purpose */}
              <label className="text-gray-600 font-semibold text-sm">
                Meeting Purpose
              </label>
              <textarea
                className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 h-24 resize-none focus:ring focus:ring-blue-200"
                placeholder="Describe your reason..."
              />

              {/* Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Book Session
              </button>
            </form>
          </div>
        </div>
        <div>
          <Schedule></Schedule>
        </div>
        <div>
          <Scheduleheader></Scheduleheader>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
