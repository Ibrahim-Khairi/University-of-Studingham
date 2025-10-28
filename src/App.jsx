import React from "react";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/courses" element={<Courses></Courses>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
