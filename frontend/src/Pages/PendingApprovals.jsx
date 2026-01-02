import React from "react";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import ApprovalCard from "../components/pendingApprovalsComponents/ApprovalCard";
const PendingApprovals = () => {
    return (
        <div className="bg-[#EFEFEF]   ">
            <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
                <div>
                    <SideDashboard></SideDashboard>
                </div>
                <div>
                    <DashboardSearch />

                    <h3 className="text-[26px] font-bold mb-4 mt-8">Authorise Students</h3>
                    <div className="bg-white rounded-3xl p-6 flex flex-col gap-6">

                        <ApprovalCard />
                        <ApprovalCard />
                        <ApprovalCard />
                        <ApprovalCard />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;
