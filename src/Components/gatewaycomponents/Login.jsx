import React from "react";
import { Link } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {/* <img  alt="logo" className="w-10 h-10" /> */}
          <h1 className="font-semibold text-gray-800">
            University of Studingham
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>

        {/* University ID */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="UNIVERSITY ID"
            className="w-full pl-10 pr-4 py-2  border-none shadow shadow-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative mb-2">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full pl-10 pr-4 py-2 border-none shadow shadow-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-left mb-6">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition">
          LOG IN
        </button>

        {/* Register */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/StudentRegistration"
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
