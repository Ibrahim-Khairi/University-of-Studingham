import React from "react";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
const Digitalregisterstaff = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
      <div>
        <SideDashboard></SideDashboard>
      </div>

      <DashboardSearch />
    </div>
  );
};

export default Digitalregisterstaff;
