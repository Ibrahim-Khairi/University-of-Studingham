import React from "react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";

const StudentDigitalRegister = () => {
    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5">
                <div>
                    <DashboardPanel />
                </div>

                <div>
                    <DashboardSearch />

                    <h3 className="text-[26px] font-bold mt-8">CS102 - Website Development</h3>
                    <span className="text-[18px] text-gray-500 font-medium">Lecture Attendance</span>

                    <div className="mt-6 grid grid-rows-[] gap-4">
                        <div className="bg-white rounded-3xl p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <img src="/Images/Icons/studentRegistersDate.svg" alt="instructor" className="w-[20px]" />
                                <p className="font-semibold">Date</p>
                                <p className="text-gray-500 font-bold">Monday, 20 Oct 2025</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img src="/Images/Icons/studentRegistersTime.svg" alt="instructor" className="w-[20px]" />
                                <p className="font-semibold">Time</p>
                                <p className="text-gray-500 font-bold">09:00 AM - 11:00 AM</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img src="/Images/Icons/studentRegistersRoom.svg" alt="instructor" className="w-[20px]" />
                                <p className="font-semibold">Room</p>
                                <p className="text-gray-500 font-bold">FML-014</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img src="/Images/Icons/studentRegistersInstructor.svg" alt="instructor" className="w-[20px]" />
                                <p className="font-semibold">Instructor</p>
                                <p className="text-gray-500 font-bold">Dr. Bruce Wayne</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img src="/Images/Icons/studentRegistersStatus.svg" alt="status" className="w-[20px]" />
                                <p className="font-semibold">Status</p>
                                <p className="text-gray-500 font-bold">Ongoing</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-[65%_33.5%] gap-4 mt-4">

                            <div className="bg-white rounded-3xl p-6 flex flex-col justify-center h-[200px]">
                                <p className="font-bold text-lg mb-4 text-left">You haven't checked in yet.</p>
                                <button className="w-[240px] h-[50px] bg-[#54AD9E] text-white font-semibold rounded-lg hover:bg-[#44907e] transition">
                                    CHECK IN NOW
                                </button>
                            </div>

                            <div className="bg-white rounded-3xl p-6 h-[200px]">
                                <h4 className="font-bold text-[22px] mb-2 w-full">Module Insights</h4>

                                <div className="flex items-center w-full gap-6">
                                    <div className="relative w-30 h-30 flex-shrink-0">
                                        <svg viewBox="0 0 36 36" className="w-full h-full">
                                            <circle
                                                className="text-[#91D3CC]"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="transparent"
                                                r="16"
                                                cx="18"
                                                cy="18"
                                            />
                                            <circle
                                                className="text-[#56AC9D]"
                                                strokeWidth="2"
                                                strokeDasharray="75 25"
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                fill="transparent"
                                                r="16"
                                                cx="18"
                                                cy="18"
                                                transform="rotate(-90 18 18)"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xl">
                                            75%
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center gap-2 w-full">
                                        <div className="flex justify-between">
                                            <p className="text-gray-500 font-bold text-lg">Attended</p>
                                            <p className="text-gray-500 font-bold text-lg">24</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500 font-bold text-lg">Absent</p>
                                            <p className="text-gray-500 font-bold text-lg">8</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDigitalRegister;
