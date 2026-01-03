import React, { useEffect, useState, useContext } from "react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import ApprovalCard from "../components/pendingApprovalsComponents/ApprovalCard";
import axios from "axios";

const PendingApprovals = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPendingStudents = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get("/api/approval/tutor/students", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                setStudents(res.data);
            } catch (error) {
                console.error("Error fetching pending students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingStudents();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.patch(`/api/approval/students/${studentId}/approve`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setStudents(prev => prev.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Approval failed", error);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.get(`/api/approval/students/${studentId}/reject`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setStudents(prev => prev.filter(student => student.id !== id));
        } catch (error) {
            console.error("Reject failed", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!students.length) return <p>No pending approvals</p>;
    return (
        <div className="bg-[#EFEFEF]   ">
            <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
                <div>
                    <DashboardPanel></DashboardPanel>
                </div>
                <div>
                    <DashboardSearch />

                    <h3 className="text-[26px] font-bold mb-4 mt-8">Authorise Students</h3>
                    <div className="bg-white rounded-3xl p-6 flex flex-col gap-6">
                        {students.map(student => (
                            <ApprovalCard
                                key={student.id}
                                name={student.name}
                                role="Student"
                                course={student.course}
                                email={student.email}
                                onApprove={() => handleApprove(student._id)}
                                onReject={() => handleReject(student._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;
