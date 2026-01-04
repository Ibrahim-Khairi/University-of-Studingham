import React from "react";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TutorDashboard from "./Pages/TutorDashboard.jsx";
import Timetablestaff from "./pages/Timetablestaff";
import LibraryPortal from "./pages/Libraryportal";
import Digitalregisterstaff from "./pages/Digitalregisterstaff";
import Librarycollection from "./pages/Librarycollection";
import Bookdetail from "./pages/Bookdetail";
import Libraryhistory from "./pages/Libraryhistory";
import Mentorship from "./pages/Mentorship";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Privacypolicy from "./pages/Privacypolicy";
import Termsconditions from "./pages/Termsconditions";
import Accessibility from "./pages/Accessibility";
import ScrollToTop from "./ScrollToTop";
import Gateway from "./pages/Gateway";
import Login from "./Components/gatewaycomponents/Login";
import StudentRegistration from "./Components/gatewaycomponents/StudentRegistration";
import TutorRegistration from "./Components/gatewaycomponents/TutorRegistration";
import Financetracker from "./pages/Financetracker.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import CoursesModification from "./Pages/CoursesModification.jsx";
import PolicyModification from "./Pages/PolicyModification.jsx";
import PendingApprovals from "./Pages/PendingApprovals.jsx";
import AuthGate from "./Pages/AuthGate.jsx";
import StudentDashboard from "./Pages/StudentDashboard.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>

        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/gateway" element={<Gateway />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/tutor-registration" element={<TutorRegistration />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<AuthGate allowedRoles={["student"]}><StudentDashboard /></AuthGate>} />

            {/* Tutor Routes */}
            <Route path="/tutor/dashboard" element={<AuthGate allowedRoles={["tutor"]}><TutorDashboard /></AuthGate>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AuthGate allowedRoles={["admin"]}><AdminDashboard /></AuthGate>} />

            {/* Approval Routes */}
            <Route path="/tutor/pending-approvals" element={<AuthGate allowedRoles={["tutor", "admin"]}><PendingApprovals /></AuthGate>} />

          <Route path="/accessibility" element={<Accessibility />}></Route>
          <Route path="/terms&conditions" element={<Termsconditions />}></Route>
          <Route path="/privacypolicy" element={<Privacypolicy />}></Route>
          <Route path="/community" element={<Community />}></Route>

          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/timetablestaff" element={<Timetablestaff />}></Route>
          <Route path="/LibraryPortal" element={<LibraryPortal />}></Route>
          <Route path="/digitalregisterstaff" element={<Digitalregisterstaff />}></Route>
          <Route path="/librarycollection" element={<Librarycollection />}></Route>
          <Route path="/bookdetail" element={<Bookdetail />}></Route>
          <Route path="/libraryhistory" element={<Libraryhistory />}></Route>
          <Route path="/mentorship" element={<Mentorship />}></Route>
          <Route path="/financetracker" element={<Financetracker />}></Route>

          <Route path="/coursesmodification" element={<CoursesModification />}></Route>
          <Route path="/policymodification" element={<PolicyModification />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
