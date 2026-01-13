import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Moodle from "./Pages/Moodle/Moodle.jsx";
import Timetablestaff from "./pages/Timetablestaff";
import LibraryPortal from "./pages/Libraryportal";
import Digitalregisterstaff from "./pages/Digitalregisterstaff";
import Librarycollection from "./pages/Librarycollection";
import Bookdetail from "./pages/Bookdetail";
import Libraryhistory from "./pages/Libraryhistory";
import Mentorship from "./pages/Mentorship";

import ScrollToTop from "./ScrollToTop";

import AuthGate from "./Pages/AuthGate.jsx";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Courses from "./pages/Courses";
import Gateway from "./pages/Gateway";
import Login from "./Components/gatewaycomponents/Login";
import StudentRegistration from "./Components/gatewaycomponents/StudentRegistration";
import TutorRegistration from "./Components/gatewaycomponents/TutorRegistration";
import AdminRegistration from "./Components/gatewaycomponents/AdminRegistration.jsx";

import StudentDashboard from "./Pages/StudentDashboard.jsx";
import TutorDashboard from "./Pages/TutorDashboard.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsConditions from "./Pages/Terms&Conditions.jsx";
import Accessibility from "./pages/Accessibility";

import Financetracker from "./pages/Financetracker.jsx";
import CoursesModification from "./Pages/CoursesModification.jsx";
import PolicyModification from "./Pages/PolicyModification.jsx";
import PendingApprovals from "./Pages/PendingApprovals.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />}></Route>

          <Route path="/accessibility" element={<Accessibility />}></Route>
          <Route path="/terms&conditions" element={<TermsConditions />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

          <Route path="/gateway" element={<Gateway />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/student-registration"
            element={<StudentRegistration />}
          />
          <Route path="/tutor-registration" element={<TutorRegistration />} />
          <Route path="/admin-registration" element={<AdminRegistration />} />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <AuthGate allowedRoles={["student"]}>
                <StudentDashboard />
              </AuthGate>
            }
          />

          {/* Tutor Routes */}
          <Route
            path="/tutor/dashboard"
            element={
              <AuthGate allowedRoles={["tutor"]}>
                <TutorDashboard />
              </AuthGate>
            }
          />
          <Route
            path="/tutor/moodle"
            element={
              <AuthGate allowedRoles={["tutor"]}>
                <Moodle />
              </AuthGate>
            }
          />

          <Route
            path="/tutor/pending-approvals"
            element={
              <AuthGate allowedRoles={["tutor"]}>
                <PendingApprovals />
              </AuthGate>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthGate allowedRoles={["admin"]}>
                <AdminDashboard />
              </AuthGate>
            }
          />
          <Route
            path="/admin/pending-approvals"
            element={
              <AuthGate allowedRoles={["admin"]}>
                <PendingApprovals />
              </AuthGate>
            }
          />
          <Route
            path="/admin/courses-modification"
            element={<CoursesModification />}
          ></Route>
          <Route
            path="/admin/policy-modification"
            element={<PolicyModification />}
          ></Route>

          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/timetablestaff" element={<Timetablestaff />}></Route>
          <Route path="/LibraryPortal" element={<LibraryPortal />}></Route>
          <Route
            path="/digitalregisterstaff"
            element={<Digitalregisterstaff />}
          ></Route>
          <Route
            path="/librarycollection"
            element={<Librarycollection />}
          ></Route>
          {/* Student Routes */}
          <Route
            path="/student/moodle"
            element={
              <AuthGate allowedRoles={["student"]}>
                <Moodle />
              </AuthGate>
            }
          />

          {/* Tutor Routes */}
          <Route
            path="/tutor/moodle"
            element={
              <AuthGate allowedRoles={["tutor"]}>
                <Moodle />
              </AuthGate>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/moodle"
            element={
              <AuthGate allowedRoles={["admin"]}>
                <Moodle />
              </AuthGate>
            }
          />
          <Route path="/bookdetail" element={<Bookdetail />}></Route>
          <Route path="/libraryhistory" element={<Libraryhistory />}></Route>
          <Route path="/mentorship" element={<Mentorship />}></Route>
          <Route path="/financetracker" element={<Financetracker />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
