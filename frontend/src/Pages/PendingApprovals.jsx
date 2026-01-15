import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import ApprovalCard from "../components/pendingApprovalsComponents/ApprovalCard";
import axios from "axios";

const PendingApprovals = () => {
    const { user, loading: authLoading } = useAuth();

    const [items, setItems] = useState([]);
    const [header, setHeader] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("ITEMS UPDATED; ", items);
        if (authLoading || !user) return;

        const fetchApprovals = async() => {
            try {
                const token = localStorage.getItem("accessToken");
                let res;

                if (user.role === "tutor") {
                    res = await axios.get("/api/approval/tutor/students", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setHeader(`Authorise Students - ${res.data.courseName} (${res.data.courseCode})`);

                    setItems(
                        res.data.students.map(student => ({
                            ...student,
                            role: "Student",
                            id: student.id
                        }))
                    );
                }

                if (user.role === "admin") {
                    res = await axios.get("/api/approval/admin/users", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setHeader("Authorise Users");

                    setItems(
                        res.data.users.map(user => ({
                            ...user,
                            id: user.userId
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching approvals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovals();
    }, [authLoading, user]);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");

            const endpoint =
                user.role === "admin"
                    ? `/api/approval/users/${id}/approve`
                    : `/api/approval/students/${id}/approve`;

            await axios.patch(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setItems(prev => prev.map(item => item.id === id
                ? { ...item, removing: true }
                : item
            ));

            setTimeout(() => {
                setItems(prev =>
                    prev.filter(item => item.id !== id)
                );
            }, 300);
        } catch (error) {
            console.error("Approval failed:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");

            const endpoint =
                user.role === "admin"
                    ? `/api/approval/admin/users/${id}/reject`
                    : `/api/approval/students/${id}/reject`;

            await axios.patch(endpoint, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setItems(prev => prev.map(item => item.id === id
                ? { ...item, removing: true }
                : item
            ));

            setTimeout(() => {
                setItems(prev =>
                    prev.filter(item => item.id !== id)
                );
            }, 300);
        } catch (error) {
            console.error("Reject failed", error);
        }
    };

    return (
        <div className="bg-[#EFEFEF]   ">
            <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5">
                <div>
                    <DashboardPanel></DashboardPanel>
                </div>
                <div>
                    <DashboardSearch />

                    <h3 className="text-[26px] font-bold mb-4 mt-8">{header}</h3>
                    <div className="bg-white rounded-3xl p-6 flex flex-col gap-6 flex-1 min-h-[710px]">
                        { authLoading || loading ? (
                            <div className="flex flex-1 items-center justify-center">
                                <p className="text-[20px] font-bold text-black-400">
                                    Loading Approvals...
                                </p>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center">
                                <p className="text-[20px] font-bold text-black-400">
                                    No Pending Approvals
                                </p>
                            </div>
                        ) : (
                            items.map(item => (
                                <ApprovalCard
                                    key={item.id}
                                    name={item.name}
                                    role={item.role}
                                    email={item.email}
                                    phoneNumber={item.phoneNumber}
                                    onApprove={() => handleApprove(item.id)}
                                    onReject={() => handleReject(item.id)}
                                    className={`transition-opacity duration-300 
                                    ${item.removing ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;
