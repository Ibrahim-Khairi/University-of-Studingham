import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { loginUser } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (login) {
        login(res);
      }
      const role = res.role;
      if (role === "student") navigate("/student/dashboard");
      else if (role === "tutor") navigate("/tutor/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/gateway");
    } catch (error) {
      const data = error.response?.data;
      setError(data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
        {/* University Logo */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center gap-2 mb-8 group"
        >
          <img
            src="/websitelogo.png"
            alt="University Logo"
            className="h-16 w-auto transition-transform group-hover:scale-105"
          />
          <h1 className="font-black text-gray-800 uppercase tracking-tighter text-sm">
            University of Studingham
          </h1>
        </Link>

        <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4 bg-red-50 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-none shadow shadow-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative mb-2">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-none shadow shadow-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition shadow-lg"
          >
            LOG IN
          </button>
        </form>

        {/* Updated Registration Section */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">
            Don’t have an account? Register as:
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium">
            <Link
              to="/student-registration"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Student
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/tutor-registration"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Tutor
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/admin-registration"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
