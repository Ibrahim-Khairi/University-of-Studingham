import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // --- LOGOUT FUNCTIONALITY ---
  const logout = () => {
    // 1. Clear Storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 2. Clear State
    setUser(null);

    // 3. Force a hard redirect to Login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
=======
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/auth/me", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                setUser(res.data);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
