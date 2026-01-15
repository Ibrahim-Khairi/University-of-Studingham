import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- GLOBAL UTILS ---
import ScrollToTop from "./ScrollToTop";
import AuthGate from "./Pages/AuthGate.jsx";
import AdminNoticeboard from "./Pages/AdminNoticeboard";

// --- PUBLIC PAGES ---
import Home from "./pages/Home";
import Community from "./pages/Community";
import Gateway from "./pages/Gateway";
import Login from "./Components/gatewaycomponents/Login";
import StudentRegistration from "./Components/gatewaycomponents/StudentRegistration";
import TutorRegistration from "./Components/gatewaycomponents/TutorRegistration";
import AdminRegistration from "./Components/gatewaycomponents/AdminRegistration.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsConditions from "./Pages/Terms&Conditions.jsx";
import Accessibility from "./pages/Accessibility";
import Courses from "./pages/Courses";
import CourseDetail from "./Components/coursecomponents/CourseDeltail.jsx";
import StudentAttendance from "./Pages/StudentAttendance.jsx";
// --- DASHBOARDS ---
import StudentDashboard from "./Pages/StudentDashboard.jsx";
import TutorDashboard from "./Pages/TutorDashboard.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import LibraryAdmin from "./Pages/LibraryAdmin.jsx";

// --- COMMON FEATURES ---
import Moodle from "./Pages/Moodle/Moodle.jsx";
import Timetable from "./Pages/Timetable.jsx";
import LibraryPortal from "./pages/Libraryportal";
import Librarycollection from "./pages/Librarycollection";
import Bookdetail from "./pages/Bookdetail";
import Libraryhistory from "./pages/Libraryhistory";
import Mentorship from "./pages/Mentorship";

// --- ROLE SPECIFIC FEATURES ---
import Financetracker from "./pages/Financetracker.jsx";
import AdminCoursesModification from "./Pages/AdminCoursesModification.jsx";
import PolicyModification from "./Pages/PolicyModification.jsx";
import PendingApprovals from "./Pages/PendingApprovals.jsx";
import TutorDigitalRegister from "./Pages/TutorDigitalRegister.jsx";

import StudentResourceManagement from "./Pages/StudentResourceManagement.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/gateway" element={<Gateway />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/tutor-registration" element={<TutorRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/terms&conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student/dashboard"
          element={
            <AuthGate allowedRoles={["student"]}>
              <StudentDashboard />
            </AuthGate>
          }
        />
        <Route
          path="/student/srm"
          element={
            <AuthGate allowedRoles={["student"]}>
              <StudentResourceManagement />
            </AuthGate>
          }
        />
        <Route
          path="/student/attendance-details"
          element={
            <AuthGate allowedRoles={["student"]}>
              <StudentAttendance />
            </AuthGate>
          }
        />
        <Route
          path="/student/moodle"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Moodle />
            </AuthGate>
          }
        />
        <Route
          path="/student/timetable"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Timetable />
            </AuthGate>
          }
        />
        <Route
          path="/student/finance-tracker"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Financetracker />
            </AuthGate>
          }
        />
        <Route
          path="/student/library-portal"
          element={
            <AuthGate allowedRoles={["student"]}>
              <LibraryPortal />
            </AuthGate>
          }
        />
        <Route
          path="/student/library-collection"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Librarycollection />
            </AuthGate>
          }
        />
        <Route
          path="/student/library-history"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Libraryhistory />
            </AuthGate>
          }
        />
        <Route
          path="/student/book-detail/:id"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Bookdetail />
            </AuthGate>
          }
        />
        {/* ================= TUTOR ROUTES ================= */}
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
          path="/tutor/timetable"
          element={
            <AuthGate allowedRoles={["tutor"]}>
              <Timetable />
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
        <Route
          path="/tutor/digital-register"
          element={
            <AuthGate allowedRoles={["tutor"]}>
              <TutorDigitalRegister />
            </AuthGate>
          }
        />
        {/* ================= ADMIN ROUTES ================= */}\
        <Route
          path="/admin/library"
          element={
            <AuthGate allowedRoles={["admin"]}>
              <LibraryAdmin />
            </AuthGate>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AuthGate allowedRoles={["admin"]}>
              <AdminDashboard />
            </AuthGate>
          }
        />
        <Route
          path="/admin/moodle"
          element={
            <AuthGate allowedRoles={["admin"]}>
              <Moodle />
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
          element={
            <AuthGate allowedRoles={["admin"]}>
              <AdminCoursesModification />
            </AuthGate>
          }
        />
        <Route
          path="/admin/policy-modification"
          element={
            <AuthGate allowedRoles={["admin"]}>
              <PolicyModification />
            </AuthGate>
          }
        />
        <Route
          path="/admin/noticeboard"
          element={
            <AuthGate allowedRoles={["admin"]}>
              <AdminNoticeboard />
            </AuthGate>
          }
        />
        {/* ================= MISC / LEGACY ROUTES ================= */}
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/libraryhistory" element={<Libraryhistory />} />
        <Route
          path="/financetracker"
          element={
            <AuthGate allowedRoles={["student"]}>
              <Financetracker />
            </AuthGate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
