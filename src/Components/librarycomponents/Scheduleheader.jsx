import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Scheduleheader = () => {
  return (
    <div className=" p-6 rounded-md w-full max-w-md mx-auto mt-10">
      {/* Week Switch */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button className="bg-gray-300 p-2 rounded-full">
          <ChevronLeft size={18} />
        </button>

        <h2 className="font-bold text-lg text-center">Week 1 (Oct 12-18)</h2>

        <button className="bg-gray-300 p-2 rounded-full">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-4 border border-gray-300 bg-white"></div>
          <span className="text-sm text-black">Available</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-4 bg-[#CE4C5D]"></div>
          <span className="text-sm text-red-500">Not Available</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-4 bg-[#34D960]"></div>
          <span className="text-sm text-green-700">Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Scheduleheader;
