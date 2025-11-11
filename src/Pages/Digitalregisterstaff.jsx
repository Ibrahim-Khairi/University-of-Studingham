import React from "react";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import Moduleattendance from "../components/digitalregistercomponents/Moduleattendance";
const Digitalregisterstaff = () => {
  return (
    <div className="bg-[#EFEFEF] h-full 2xl:h-screen ">
      <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
        <div>
          <SideDashboard></SideDashboard>
        </div>
        <div>
          <DashboardSearch />
          <Moduleattendance></Moduleattendance>
        </div>
      </div>
    </div>
  );
};

export default Digitalregisterstaff;
