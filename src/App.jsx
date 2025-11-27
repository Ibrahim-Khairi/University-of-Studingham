import React from "react";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Timetablestaff from "./pages/Timetablestaff";
import LibraryPortal from "./pages/Libraryportal";
import Digitalregisterstaff from "./pages/Digitalregisterstaff";
import Librarycollection from "./pages/Librarycollection";
import Bookdetail from "./pages/Bookdetail";
import Libraryhistory from "./pages/Libraryhistory";
import Mentorship from "./pages/Mentorship";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/courses" element={<Courses></Courses>}></Route>
          <Route path="/timetablestaff" element={<Timetablestaff />}></Route>
          <Route path="/LibraryPortal" element={<LibraryPortal />}></Route>
          <Route path="/digitalregisterstaff" element={<Digitalregisterstaff />}></Route>
          <Route path="/librarycollection" element={<Librarycollection />}></Route>
          <Route path="/bookdetail" element={<Bookdetail />}></Route>
          <Route path="/libraryhistory" element={<Libraryhistory />}></Route>
          <Route path="/mentorship" element={<Mentorship />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
