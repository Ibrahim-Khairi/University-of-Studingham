import { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { Spinner } from "../Components/gatewaycomponents/Spinner.jsx"
import axios from "axios";

const AuthGate = ({ children, allowedRoles }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("AuthGate: fetching /api/auth/me");

                const token = localStorage.getItem("accessToken");
                console.log("AuthGate: token =", token);

                const res = await axios.get("/api/auth/me", {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ""
                    }
                });

                console.log("AuthGate: user data =", res.data);
                setUser(res.data);
            } catch (error) {
                console.log("AuthGate: error fetching user", error.response?.data || error);
                setErrorState("unauthenticated");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: `url(comunity4.png)` }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

                <div className="relative z-10 bg-red rounded-2xl shadow-xl w-full max-w-md px-8 py-10 flex flex-col items-center justify-center">
                    <Spinner
                        size="lg"
                        color="blue"
                        text="Awaiting approval. Please wait..."
                    />
                </div>
            </div>
        );
    }

    if (errorState === "unauthenticated") return <Navigate to="/gateway" replace />;

    if (!user && !loading) return <Navigate to="/gateway" replace />;
    const { role, status } = user || {};

    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/gateway" replace />;

    if (role === "student" && status === "pending") {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: `url(/comunity4.png)` }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

                <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10 flex flex-col items-center justify-center">
                    <Spinner
                        size="lg"
                        color="blue"
                        text="Awaiting approval. Please wait..."
                    />
                </div>
            </div>
        );
    }

    if (role === "student" && status === "rejected") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <div className="text-red-600 text-6xl mb-4">✖</div>
                <h1 className="text-2xl font-bold">Registration Rejected</h1>
                <p className="text-gray-500 mt-2">
                    Your application has been rejected.
                </p>
            </div>
        );
    }

    return children;
};

export default AuthGate;