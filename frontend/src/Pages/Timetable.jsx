import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import LecturesCalendar from '../components/Timetablecomponents/LecturesCalendar';
import DashboardPanel from '../components/Dashboardcomponents/DashboardPanel';

const Timetable = () => {
    // const { user, loading: authLoading } = useAuth();
    //
    // const [lectures, setLectures] = useState([]);
    // const [week, setWeek] = useState(1);
    // const [loading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     if (authLoading || !user) return;
    //
    //     const fetchTimetable = async () => {
    //         try {
    //             let endpoint = "";
    //
    //             if (user.role === "student") endpoint = "/timetable/student";
    //             if (user.role === "tutor") endpoint = "/timetable/tutor";
    //
    //             const res = await axios.get(endpoint, {
    //                 params: {weekNumber: week}
    //             });
    //
    //             const formatted = res.data.map((lecture) => ({
    //                 day: lecture.day,
    //                 time: lecture.startTime,
    //                 title: lecture.moduleId.name,
    //                 code: lecture.moduleId.code,
    //                 teacher: lecture.tutorId?.name || "TBA",
    //                 room: lecture.room || "—"
    //             }));
    //
    //             setLectures(formatted);
    //         } catch (error) {
    //         console.error("Error fetching timetable:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // })
  return (
   <div className="bg-[#EFEFEF]  ">
      <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
        <div>
            <DashboardPanel />
        </div>
      <LecturesCalendar />
    </div>
       </div>
  )
}

export default Timetable
