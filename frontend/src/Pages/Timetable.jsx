import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import LecturesCalendar from '../components/Timetablecomponents/LecturesCalendar';
import DashboardPanel from '../components/Dashboardcomponents/DashboardPanel';

const Timetable = () => {
    const { user, loading: authLoading } = useAuth();

    const [lectures, setLectures] = useState([]);
    const [week, _setWeek] = useState(1);
    const [academicYearStart, setAcademicYearStart] = useState(null);

    // Dynamically constrain week based on role and lectures
    const isStudent = user?.role === 'student';
    const tutorMin = lectures.length ? Math.min(...lectures.map(l => l.week)) : 1;
    const tutorMax = lectures.length ? Math.max(...lectures.map(l => l.week)) : 1;
    const minWeek = isStudent ? 1 : tutorMin;
    const maxWeek = isStudent ? 32 : tutorMax;

    const setWeek = (nextWeek) => {
        if (typeof nextWeek === "function") {
            _setWeek(prev => Math.min(maxWeek, Math.max(minWeek, nextWeek(prev))));
        } else {
            _setWeek(Math.min(maxWeek, Math.max(minWeek, nextWeek)));
        }
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchTimetable = async () => {
            try {
                let endpoint = "";

                if (user.role === "student") endpoint = "http://localhost:5000/api/timetable/student";
                if (user.role === "tutor") endpoint = "http://localhost:5000/api/timetable/tutor";

                const token = localStorage.getItem("accessToken");

                const res = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("TIMETABLE RESPONSE:", res.data);

                const lectureRes = res.data.lectures || [];
                setAcademicYearStart(res.data.academicYearStart || null);

                const formatted = lectureRes.map(lecture => {
                    const tutorName = lecture.tutorId
                        ? [lecture.tutorId.firstName, lecture.tutorId.lastName].filter(Boolean).join(' ')
                        : (user.role === 'tutor'
                            ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || 'TBA'
                            : 'TBA');
                    return ({
                        day: lecture.day?.charAt(0).toUpperCase() + lecture.day?.slice(1).toLowerCase(),
                        time: lecture.startTime.slice(0, 5),   // "09:00"
                        week: lecture.weekNumber,
                        title: lecture.moduleId?.name,
                        code: lecture.courseId?.code,
                        // Tutor name (populated) or current tutor fallback
                        teacher: tutorName || 'TBA',
                        room: lecture.room || "—",
                    });
                });

                setLectures(formatted);
                // Set initial week to the earliest week available
                const initialWeek = isStudent
                    ? 1
                    : (formatted.length ? Math.min(...formatted.map(l => l.week)) : 1);
                _setWeek(initialWeek);

            } catch (error) {
                console.error("Error fetching timetable:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [user, authLoading]);

    if (loading) return <div>Loading timetable...</div>;

    return (
        <div className="bg-[#EFEFEF]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5">
                <div>
                    <DashboardPanel />
                </div>
                <LecturesCalendar
                    lectures={lectures}
                    week={week}
                    onWeekChange={setWeek}
                    academicYearStart={academicYearStart}
                    minWeek={minWeek}
                    maxWeek={maxWeek}
                />
            </div>
        </div>
    );
};

export default Timetable;