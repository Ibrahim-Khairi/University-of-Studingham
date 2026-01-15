import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerTutor } from "../../services/authService.js";
import { Spinner } from "./Spinner.jsx";

const TutorRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    courseId: "",
    year: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [pendingSpinner, setPendingSpinner] = useState(false);

  // 1. Fetch all available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/setup/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // 2. Fetch modules based on selected Course and Year
  useEffect(() => {
    if (!formData.courseId || !formData.year) {
      setModules([]);
      return;
    }

    const fetchModules = async () => {
      try {
        // We use ?all=true to see both visible and hidden modules
        const res = await fetch(
          `http://localhost:5000/api/setup/modules/${formData.courseId}/${formData.year}?all=true`
        );
        const data = await res.json();

        /**
         * FILTER LOGIC:
         * We keep modules regardless of visibility (all=true),
         * BUT we filter out modules that are already assigned to another tutor.
         * (Assuming the backend property is named 'tutor' or 'tutorId')
         **/
        const availableModules = data.filter((m) => !m.tutor && !m.tutorId);

        setModules(availableModules);
        setSelectedModules([]);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setModules([]);
      }
    };
    fetchModules();
  }, [formData.courseId, formData.year]);

  const toggleModule = (moduleId) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : prev.length >= 2
        ? prev
        : [...prev, moduleId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedModules.length !== 2) {
      return alert("Please select exactly 2 modules.");
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (image) data.append("picture", image);
      selectedModules.forEach((id) => data.append("modules", id));

      await registerTutor(data);
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 bg-white rounded-2xl p-12 flex flex-col items-center text-center">
          <Spinner size="lg" color="blue" />
          <h2 className="text-2xl font-bold mt-6">Application Submitted</h2>
          <p className="text-gray-600 mt-2">Awaiting administrator approval.</p>
          <Link to="/" className="mt-6 text-blue-600 font-bold underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative pb-20"
      style={{ backgroundImage: `url(/comunity4.png)` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 px-6 py-10 max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-4 mb-10 group w-fit">
          <img
            src="/websitelogo.png"
            alt="Logo"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
          <h1 className="text-white font-black uppercase text-xl leading-none">
            University of <br /> Studingham
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="text-white">
          <h2 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input
              className="input"
              placeholder="FIRST NAME"
              required
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="MIDDLE NAME"
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="LAST NAME"
              required
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <input
              type="date"
              className="input"
              required
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />

            <select
              className="input"
              required
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
              type="email"
              placeholder="EMAIL ADDRESS"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="PHONE NUMBER"
              required
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />

            <div className="flex items-center gap-4 bg-white rounded-xl p-3 text-black">
              <p className="text-xs font-bold">Profile Image:</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
            Academic Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <select
              className="input"
              required
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: e.target.value })
              }
            >
              <option value="" disabled>
                Choose your Course
              </option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>

            <select
              className="input"
              required
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
            </select>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-10">
            <p className="text-xs font-black uppercase tracking-widest mb-4">
              Available Modules (Select 2):
            </p>

            {modules.length === 0 ? (
              <p className="text-sm text-yellow-400">
                No unassigned modules found for this selection.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {modules.map((m) => (
                  <label
                    key={m._id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedModules.includes(m._id)
                        ? "bg-green-600 border-green-400"
                        : "bg-black/20 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedModules.includes(m._id)}
                      onChange={() => toggleModule(m._id)}
                      disabled={
                        !selectedModules.includes(m._id) &&
                        selectedModules.length === 2
                      }
                    />
                    <span className="text-[11px] font-black uppercase">
                      {m.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
            Security
          </h2>
          <div className="max-w-md">
            <input
              className="input"
              type="password"
              placeholder="PASSWORD"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col items-center mt-12">
            <button
              type="submit"
              className="px-20 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-black uppercase text-sm shadow-2xl transition-all active:scale-95"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>

      <style>{`.input { width: 100%; padding: 1rem; border-radius: 0.75rem; background: white; color: black; font-size: 0.85rem; outline: none; border: 2px solid transparent; font-weight: 700; } .input:focus { border-color: #22c55e; }`}</style>
    </div>
  );
};

export default TutorRegistration;
