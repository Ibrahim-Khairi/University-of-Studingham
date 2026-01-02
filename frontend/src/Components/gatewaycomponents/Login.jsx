import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { loginUser } from "../../services/authService.js"

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await loginUser({ email, password });

            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);

            navigate("/student/dashboard");
        } catch (error) {
            const data = error.response?.data;
            setError(data?.message || "Login failed");
        }
    };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10">

        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="font-semibold text-gray-800">
            University of Studingham
          </h1>
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>
          { error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2  border-none shadow shadow-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 required"
                  />
              </div>

              <div className="relative mb-2">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-none shadow shadow-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 required"
                  />
              </div>

              <div className="text-left mb-6">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot Password?
                  </a>
              </div>

              <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition">
                  LOG IN
              </button>
          </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/studentregistration"
            className="text-blue-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;