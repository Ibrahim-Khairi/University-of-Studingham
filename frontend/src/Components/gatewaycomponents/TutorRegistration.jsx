import React, { useState, useEffect } from "react";
import {registerTutor} from "../../services/authService.js";

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
        modules: "",
        password: ""
    });
    const [image, setImage] = useState(null);
    const [courses, setCourses] = useState([]);
    const [year, setYear] = useState("");
    const [modules, setModules] = useState([]);
    const [selectedModules, setSelectedModules] = useState([]);

    useEffect(() => {
        void (async () => {
            try {
                const res = await fetch("http://localhost:5000/api/setup/courses")
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                console.log("Error fetching courses:", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!formData.courseId || !year) return;
        void (async () => {
            try {
                const res = await fetch (`http://localhost:5000/api/setup/modules/${formData.courseId}/${year}`);
                const data = await res.json();
                setModules(data);
                setSelectedModules([]);
            } catch (error) {
                console.log("Error fetching modules:", error);
            }
        })();
    }, [formData.courseId, year])

    const toggleModule = (moduleId) => {
        setSelectedModules((prev) => {
            if (prev.includes(moduleId)) return prev.filter((id) => id !== moduleId);

            if (prev.length === 2) return prev;

            return [...prev, moduleId];
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if (image) {
                data.append("picture", image);
            }

            if (selectedModules.length !== 2) {
                alert("You must select exactly 2 modules");
                return;
            }
            selectedModules.forEach((id) =>
                data.append("modules", id)
            )

            await registerTutor(data);

            console.log("Tutor registered successfully");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <form
          onSubmit={handleSubmit}
          className="relative z-10 text-white px-6 py-10"
      >
          <div className="max-w-5xl mx-auto">

              <h2 className="text-xl font-semibold mb-6 tracking-wide">
                  Tutor Registration &gt; Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <input
                      className="input"
                      placeholder="FIRST NAME"
                      value={formData.firstName}
                      onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <input
                      className="input"
                      placeholder="MIDDLE NAME (if any)"
                      value={formData.middleName}
                      onChange={(e) =>
                          setFormData({ ...formData, middleName: e.target.value })}
                  />
                  <input
                      className="input"
                      placeholder="LAST NAME"
                      value={formData.lastName}
                      onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <input
                      type="date"
                      className="input"
                      placeholder="DD/MM/YYYY"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                          setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />

                  <select
                      className="input"
                      value={formData.gender}
                      onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })}
                  >
                      <option value="" disabled>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                  </select>

                  <input className="input"
                         placeholder="EMAIL ADDRESS"
                         value={formData.email}
                         onChange={(e) =>
                             setFormData({ ...formData, email: e.target.value })}
                  />
                  <input className="input"
                         placeholder="PHONE NUMBER"
                         value={formData.phoneNumber}
                         onChange={(e) =>
                             setFormData({ ...formData, phoneNumber: e.target.value })}
                  />

                  <div className="flex items-center gap-4 bg-white rounded-md p-4 text-black">
                      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded">
                          📷
                      </div>
                      <div>
                          <p className="text-sm text-gray-600">
                              Please upload square image.
                              <br />
                              less than 100KB
                          </p>
                          <label className="text-sm text-green-700 font-medium cursor-pointer">
                              Choose File
                              <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) =>
                                      setImage(e.target.files[0])}
                              />
                          </label>

                          {image && (
                              <p className="text-xs text-gray-500 mt-1">
                                  Selected: {image.name}
                              </p>
                          )}
                      </div>
                  </div>
              </div>

          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            Tutor Registration &gt; Academic Details
          </h2>

          <div className="mb-6">
            <select
                className="input mb-4"
                value={formData.courseId}
                onChange={(e) =>
                    setFormData({ ...formData, courseId: e.target.value })}
            >
              <option value="" disabled>Choose your Course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.name} ({course.code})
                    </option>
                ))}
            </select>

              <select
                  className="input mb-4"
                  value={year}
                  onChange={(e) =>
                      setYear(Number(e.target.value))}>
                  <option value="" disabled>Select Year</option>
                  <option value={1}>Year 1</option>
                  <option value={2}>Year 2</option>
                  <option value={3}>Year 3</option>
              </select>

            <p className="text-sm mb-2">Modules Available:</p>

            <div className="space-y-2 text-sm">
              {/*<label className="flex items-center gap-2">*/}
              {/*  <input type="checkbox" />*/}
              {/*  Introduction to Networking*/}
              {/*</label>*/}

              {/*<label className="flex items-center gap-2">*/}
              {/*  <input type="checkbox" defaultChecked />*/}
              {/*  Cybersecurity Basics*/}
              {/*</label>*/}

              {/*<label className="flex items-center gap-2">*/}
              {/*  <input type="checkbox" defaultChecked />*/}
              {/*  Operating Systems*/}
              {/*</label>*/}

              {/*<label className="flex items-center gap-2">*/}
              {/*  <input type="checkbox" />*/}
              {/*  Java and Data Structures*/}
              {/*</label>*/}
                {modules.map((module) => (
                    <label key={module._id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedModules.includes(module._id)}
                            onChange={() => toggleModule(module._id)}
                            disabled={
                                !selectedModules.includes(module._id) &&
                                selectedModules.length === 2
                            }
                        />
                        {module.name}
                    </label>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Please select any 2 of the module(s) to proceed.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Tutor Registration &gt; Account Creation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                  className="input mb-2"
                  placeholder="CREATE PASSWORD"
                  value={formData.password}
                  onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-gray-300">
                Your password must include at least 8 characters with a mix of
                uppercase, lowercase, numbers, and symbols.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-12 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide transition duration-300 shadow-lg"
            >
              Next
            </button>
          </div>
        </div>
      </form>

      <style>
        {`
          .input {
            width: 100%;
            padding: 0.6rem 0.9rem;
            border-radius: 0.375rem;
            background: white;
            color: black;
            font-size: 0.875rem;
            outline: none;
          }
          .input:focus {
            box-shadow: 0 0 0 2px #22c55e;
          }
        `}
      </style>
    </div>
  );
};

export default TutorRegistration;
