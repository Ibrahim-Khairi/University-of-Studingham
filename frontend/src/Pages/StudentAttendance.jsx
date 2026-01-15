import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";

const StudentAttendance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          "http://localhost:5000/api/attendance/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center font-black uppercase tracking-widest text-gray-400">
        Loading Academic History...
      </div>
    );

  // Calculate Statistics
  const attendedCount =
    data?.history.filter((h) => h.status === "present").length || 0;
  const missedCount =
    data?.history.filter((h) => h.status === "absent" || h.status === "leave")
      .length || 0;

  const chartData = [
    { name: "Attended", value: attendedCount, color: "#52A371" },
    { name: "Absences", value: missedCount, color: "#D65252" },
  ];

  const missedLectures = data?.history.filter(
    (h) => h.status === "absent" || h.status === "leave"
  );

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5">
        <DashboardPanel />

        <div className="space-y-6">
          <DashboardSearch />

          {/* 1. TOP SECTION: SUMMARY & PIE CHART */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-6">
                Attendance Details
              </h2>
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {[
                    ["Student Name", data?.studentInfo.name],
                    ["Student ID", data?.studentInfo.id],
                    ["Level", data?.studentInfo.level],
                    ["Attended", attendedCount],
                    ["Absences", missedCount],
                  ].map(([label, value], idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 bg-gray-50 font-black text-gray-500 uppercase text-[10px] w-1/3">
                        {label}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. BOTTOM SECTION: MISSED LECTURES TABLE */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm">
            <h2 className="text-2xl font-black text-gray-800 mb-8">
              Lectures Missed / Leave
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="pb-4">Module</th>
                    <th className="pb-4">Event Title</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Time</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-gray-700">
                  {missedLectures.length > 0 ? (
                    missedLectures.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-5">
                          {data.studentInfo.level.split("-")[1]}
                        </td>
                        <td className="py-5">
                          {item.lectureId?.moduleId?.name || "N/A"}
                        </td>
                        <td className="py-5">
                          {new Date(item.lectureId?.date).toLocaleDateString()}
                        </td>
                        <td className="py-5">{item.lectureId?.startTime}</td>
                        <td className="py-5 uppercase text-[10px]">
                          <span
                            className={
                              item.status === "leave"
                                ? "text-blue-500"
                                : "text-red-500"
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-10 text-center text-gray-300 italic font-medium"
                      >
                        No missed lectures found. Great job!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
