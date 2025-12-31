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
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/StudentRegistration" element={<StudentRegistration />}></Route>
          <Route path="/TutorRegistration" element={<TutorRegistration />}></Route>
          <Route path="/gateway" element={<Gateway />}></Route>
          <Route path="/accessibility" element={<Accessibility />}></Route>
          <Route path="/terms&conditions" element={<Termsconditions />}></Route>
          <Route path="/privacypolicy" element={<Privacypolicy />}></Route>
          <Route path="/community" element={<Community />}></Route>

          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/tutor/dashboard" element={<TutorDashboard />}></Route>
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
