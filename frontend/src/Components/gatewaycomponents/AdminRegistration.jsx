import React, { useState } from "react";
import { Link } from "react-router-dom"; // Added Link
import { registerAdmin } from "../../services/authService.js";
import { Spinner } from "./Spinner.jsx";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
    adminCode: "",
  });
  const [image, setImage] = useState(null);
  const [pendingSpinner, setPendingSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (image) data.append("picture", image);
      await registerAdmin(data);
      setPendingSpinner(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  if (pendingSpinner) {
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
            text="Registration submitted. Awaiting approval..."
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 px-6 py-10 max-w-5xl mx-auto">
        {/* Logo Link */}
        <Link to="/" className="flex items-center gap-4 mb-10 group w-fit">
          <img
            src="/websitelogo.png"
            alt="Logo"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
          <h1 className="text-white font-black uppercase tracking-tighter text-xl leading-none">
            University of <br /> Studingham
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="text-white">
          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Admin Registration &gt; Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input
              className="input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <input
              type="date"
              className="input"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
            <select
              className="input"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              className="input"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            <div className="flex items-center gap-4 bg-white rounded-md p-4 text-black">
              <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded text-2xl">
                📷
              </div>
              <div>
                <p className="text-xs text-gray-600">
                  Please upload square image (under 300KB)
                </p>
                <label className="text-sm text-green-700 font-bold cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                {image && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Admin Authorization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input
              className="input"
              placeholder="ADMIN ACCESS CODE"
              value={formData.adminCode}
              onChange={(e) =>
                setFormData({ ...formData, adminCode: e.target.value })
              }
            />
          </div>

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Account Creation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="input"
              type="password"
              placeholder="CREATE PASSWORD"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-16 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-xs transition shadow-xl"
            >
              Activate Admin Account
            </button>
          </div>
        </form>
      </div>
      <style>{`.input { width: 100%; padding: 0.8rem 1rem; border-radius: 0.75rem; background: white; color: black; font-size: 0.875rem; outline: none; border: none; font-weight: 600; } .input:focus { box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.5); }`}</style>
    </div>
  );
};

export default AdminRegistration;
