import React from "react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import DashboardSchedule from "../Components/Dashboardcomponents/DashboardSchedule.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const TutorDashboard = () => {
    const { loading } = useAuth();
    // 🔒 PAGE-LEVEL AUTH GATE (THIS IS THE KEY)
    if (loading) {
        return (
            <div className="bg-[#EFEFEF] p-5">
                <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4">
                    <div className="min-w-[330px] min-h-[840px] bg-[#72333B] rounded-3xl" />
                    <div className="bg-white rounded-3xl min-h-[840px]" />
                </div>
            </div>
        );
    }
  return (
    <div className="bg-[#EFEFEF]   ">
      <div className=" grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5 ">
        <div>
          <DashboardPanel></DashboardPanel>
        </div>
        <div>
          <DashboardSearch />

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.7fr] gap-4">
              <div className="bg-[#4C86A8] p-6 rounded-3xl mt-5">
                <Link
                  to="/"
                  className="text-white border-b-3 text-[18px] inline-block  mb-2"
                >
                  {" "}
                  Lecturer Overview
                </Link>
                <p className="text-white text-[18px] font-medium">
                  Website Development - 45 students
                </p>
                  <p className="text-white text-[18px] font-medium">
                      C++ Programming - 38 students
                  </p>
                  <p className="text-white text-[18px] font-medium">
                      Next Class: 10 am, FML-014
                  </p>
                  <p className="text-white text-[18px] font-medium">
                      Dr. Michael Owens
                  </p>
              </div>
              <div className="bg-white rounded-xl p-5 mt-5">
                <div className="flex items-center">
       <svg width="45" height="58" viewBox="0 0 45 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.5683 50C29.5683 52.9253 28.0846 55.1643 25.6749 56.6277C23.266 58.0904 20.2978 58.0904 17.8934 56.6277C15.483 55.1643 14 52.9253 14 50" fill="black"/>
<path d="M22.4757 0C24.599 0 26.3091 1.37598 26.3091 3.49197C26.3091 4.82381 26.3533 5.81758 27.1496 6.07213C33.9205 8.22121 38.2622 13.2586 38.2622 19.8004V30.7957C38.2622 35.833 40.2228 36.8528 42.6901 38.7797C46.2634 41.5655 45.4477 47.3665 41.3474 47.3626H3.60552C-0.494797 47.3665 -1.31051 41.5655 2.26274 38.7797C4.72713 36.8528 6.6907 35.833 6.6907 30.7957V19.8004C6.6907 13.2586 11.0324 8.22121 17.8033 6.07213C18.5973 5.81758 18.6438 4.82381 18.6438 3.49197C18.6445 1.37598 20.3554 0 22.4757 0Z" fill="black"/>
</svg>

<h3 className="text-[35px] font-bold ml-5">Noticeboard</h3>

                </div>
              <div className="grid grid-cols-3 gap-6">
                  <div className="h-[100px] mt-2 rounded-2xl border-4 border-[#8E3B46]">
               
                </div>
                <div className="h-[100px] mt-2 rounded-2xl border-4 border-[#4C86A8]">
               
                </div>
                <div className="h-[100px] mt-2 rounded-2xl border-4 border-[#407008]">
               
                </div>
              </div>
              </div>
            </div>
          </div>
          <div>
            <DashboardSchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
