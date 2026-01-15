import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, useLocation } from "react-router-dom";

const DashboardPanel = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  // Debugging: log user changes
  useEffect(() => {
    console.log("DashboardPanel detected user change:", user);
  }, [user]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#72333B] min-w-[330px] min-h-[840px] rounded-3xl animate-pulse flex flex-col p-[30px]">
        <div className="w-full h-[219px] bg-white/10 rounded-4xl mb-10" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Safety check
  if (!user || !user.role) {
    console.warn("DashboardPanel: No user or role found in Context state.");
    return (
      <div className="bg-[#72333B] min-w-[330px] min-h-[840px] rounded-3xl flex items-center justify-center">
        <p className="text-white opacity-50">Loading profile...</p>
      </div>
    );
  }

  const role = user.role;

  const MENU = {
    student: [
      {
        label: "Dashboard",
        icon: "/Images/Icons/DashboardIcon.svg",
        path: "/student/dashboard",
      },
      {
        label: "Moodle",
        icon: "/Images/Icons/MoodleIcon.svg",
        path: "/student/moodle",
      },
      { label: "SRM", icon: "/Images/Icons/SRMIcon.svg", path: "/student/srm" },
      {
        label: "Timetable",
        icon: "/Images/Icons/TimetableIcon.svg",
        path: "/student/timetable",
      },
      {
        label: "Digital Register",
        icon: "/Images/Icons/DigitalRegisterIcon.svg",
        path: "/student/digital-register",
      },
      {
        label: "Attendance Details",
        icon: "/Images/Icons/AttendanceDetailsIcon.svg",
        path: "/student/attendance-details",
      },
      {
        label: "Library Portal",
        icon: "/Images/Icons/LibraryPortalIcon.svg",
        path: "/student/library-portal",
      },
      {
        label: "Finance Tracker",
        icon: "/Images/Icons/FinanceTrackerIcon.svg",
        path: "/student/finance-tracker",
      },
    ],
    tutor: [
      {
        label: "Dashboard",
        icon: "/Images/Icons/DashboardIcon.svg",
        path: "/tutor/dashboard",
      },
      {
        label: "Moodle",
        icon: "/Images/Icons/MoodleIcon.svg",
        path: "/tutor/moodle",
      },
      {
        label: "Timetable",
        icon: "/Images/Icons/TimetableIcon.svg",
        path: "/tutor/timetable",
      },
      {
        label: "Digital Register",
        icon: "/Images/Icons/DigitalRegisterIcon.svg",
        path: "/tutor/digital-register",
      },
      {
        label: "Library Portal",
        icon: "/Images/Icons/LibraryPortalIcon.svg",
        path: "/tutor/library-portal",
      },
      {
        label: "Pending Approvals",
        icon: "/Images/Icons/PendingApprovalsIcon.svg",
        path: "/tutor/pending-approvals",
      },
    ],
    admin: [
      {
        label: "Dashboard",
        icon: "/Images/Icons/DashboardIcon.svg",
        path: "/admin/dashboard",
      },
      {
        label: "Moodle",
        icon: "/Images/Icons/MoodleIcon.svg",
        path: "/admin/moodle",
      },
      {
        label: "Course Modification",
        icon: "/Images/Icons/TimetableIcon.svg",
        path: "/admin/courses-modification",
      },
      {
        label: "Policy Modification",
        icon: "/Images/Icons/DigitalRegisterIcon.svg",
        path: "/admin/policy-modification",
      },
      {
        label: "Pending Approvals",
        icon: "/Images/Icons/PendingApprovalsIcon.svg",
        path: "/admin/pending-approvals",
      },
    ],
  };

  const menuItems = MENU[role] || [];

  return (
    <div className="bg-[#72333B] min-w-[330px] min-h-[840px] rounded-3xl flex flex-col p-[30px] shadow-2xl">
      <div>
        <div className="mb-5">
          <Link to="/">
            <div
              className="rounded-4xl bg-[#D9D9D9] w-full h-[219px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/Images/unilogo.png')" }}
            />
          </Link>
        </div>

        <nav>
          <ul className="mt-2 mb-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 text-white font-[Century Gothic] font-bold text-[18px] py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                  >
                    <img src={item.icon} alt={item.label} className="w-8 h-8" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto flex pl-6">
        <button
          type="button"
          onClick={logout}
          className="text-white font-[Century Gothic] font-bold text-[18px] flex gap-3 rounded-2xl items-center py-3 px-6 hover:bg-red-900/40 transition-colors cursor-pointer"
        >
          <img
            src="/Images/Icons/LogoutIcon.svg"
            alt="Logout"
            width="30"
            height="30"
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPanel;
