import React from "react";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import { CoursesModificationForm } from "../components/coursesModificationComponents/CoursesModificationForm.jsx";
const CoursesModification = () => {
    return (
        <div className="bg-[#EFEFEF]   ">
            <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
                <div>
                    <SideDashboard></SideDashboard>
                </div>
                <div>
                    <DashboardSearch />

                    <h3 className="text-[26px] font-bold mb-4 mt-8">Course Modification</h3>
                    <div>
                        <CoursesModificationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesModification;
