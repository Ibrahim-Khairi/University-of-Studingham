import React from "react";
import {LibraryIcon, UserIcon} from "lucide-react";

const DashboardPanel = () => {
    const MENU = {
        student: [
            { label: "Dashboard", icon: "/Images/Icons/DashboardIcon.svg", path: "/student/dashboard" },
            { label: "Moodle", icon: "/Images/Icons/MoodleIcon.svg", path: "/student/moodle" },
            { label: "SRM", icon: "/Images/Icons/SRMIcon.svg", path: "/student/srm" },
            { label: "Timetable", icon: "/Images/Icons/TimetableIcon.svg", path: "/student/timetable" },
            { label: "Digital Register", icon: "/Images/Icons/DigitalRegisterIcon.svg", path: "/student/digital-register" },
            { label: "Attendance Details", icon: "/Images/Icons/AttendanceDetailsIcon.svg", path: "/student/attendance-details" },
            { label: "Library Portal", icon: "/Images/Icons/LibraryPortalIcon.svg", path: "/student/library-portal" },
            { label: "Finance Tracker", icon: "/Images/Icons/FinanceTrackerIcon.svg", path: "/student/finance-tracker" }
        ],
        tutor: [
            { label: "Dashboard", icon: "/Images/Icons/DashboardIcon.svg", path: "/tutor/dashboard" },
            { label: "Moodle", icon: "/Images/Icons/MoodleIcon.svg", path: "/tutor/moodle" },
            { label: "Timetable", icon: "/Images/Icons/TimetableIcon.svg", path: "/tutor/timetable" },
            { label: "Digital Register", icon: "/Images/Icons/DigitalRegisterIcon.svg", path: "/tutor/digital-register" },
            { label: "Library Portal", icon: "/Images/Icons/LibraryPortalIcon.svg", path: "/tutor/library-portal" },
            { label: "Pending Approvals", icon: "/Images/Icons/PendingApprovalsIcon.svg", path: "/tutor/pending-approvals" }
        ],
        admin: [
            { label: "Dashboard", icon: "/Images/Icons/DashboardIcon.svg", path: "/admin/dashboard" },
            { label: "Moodle", icon: "/Images/Icons/MoodleIcon.svg", path: "/admin/moodle" },
            { label: "Course Modification", icon: "/Images/Icons/TimetableIcon.svg", path: "/admin/course-modification" }, // ⬅ removed extra spaces
            { label: "Policy Modification", icon: "/Images/Icons/DigitalRegisterIcon.svg", path: "/admin/policy-modification" },
            { label: "Pending Approvals", icon: "/Images/Icons/PendingApprovalsIcon.svg", path: "/admin/pending-approvals" }
        ]
    };
    const role = "student";
    const menuItems = MENU[role];
  return (
    <div className="">
        <div className="bg-[#72333B] w-[330px] min-h-[840px] rounded-3xl flex flex-col p-[60px] lg:p-[30px]">
        <div>
          <div className="mb-5">
            <div className="rounded-4xl bg-[#D9D9D9] w-full h-[219px] bg-[url('./Images/unilogo.png')] bg-cover bg-center " />
          </div>
          <ul className="mt-2 mb-1 space-y-1">
              {menuItems.map((item) => (
                  <li key={item.path}>
                      <a
                          href={item.path}
                          className="flex items-center gap-4 text-white font-[Century Gothic] font-bold text-[18px] py-3 px-2 rounded-xl hover:bg-white/10 transition"
                      >
                          <img
                              src={item.icon}
                              alt={item.label}
                              className="w-8 h-8"
                          />
                          <span>{item.label}</span>
                      </a>
                  </li>
              ))}
          </ul>
        </div>
        <div className="mt-auto flex pl-14">
            <a className="text-white font-[Century Gothic] font-bold text-[18px] flex gap-2 rounded-2xl items-center py-3 px-6 hover:bg-white/10 transition cursor-pointer">
                <img src="/Images/Icons/LogoutIcon.svg" alt="Logout" width="30px" height="30px" />
                Logout
            </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
