import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Run on app load (Handle Refresh)
    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (error) {
                console.error("Auth initialization failed:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    // 2. LOGIN FUNCTION
    const login = (userData) => {
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        setUser(userData);
        setLoading(false);
    };

    // 3. LOGOUT FUNCTION
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);