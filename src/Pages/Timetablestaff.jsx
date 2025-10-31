import React from "react";
import LecturesCalendar from "../Components/Timetablecomponents/LectureCalender";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";

const Timetablestaff = () => {
  return (
    <div className="bg-[#EFEFEF]  ">
      <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
        <div>
          <SideDashboard />
        </div>
        <LecturesCalendar />
      </div>
    </div>
  );
};

export default Timetablestaff;
