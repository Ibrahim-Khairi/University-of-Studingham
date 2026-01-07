import React, { useState, useEffect } from "react";
import { registerStudent } from "../../services/authService.js";
import { Spinner } from "./Spinner.jsx";

const StudentRegistration = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        courseId: "",
        levelOfStudy: "",
        modeOfStudy: "",
        password: ""
    });
    const [image, setImage] = useState(null);
    const [courses, setCourses] = useState([]);
    const [pendingSpinner, setPendingSpinner] = useState(false);

    useEffect(() => {
        void (async () => {
            try {
                const res = await fetch("http://localhost:5000/api/setup/courses");
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                console.log("Error fetching courses:", error);
            }
        })();
    }, []);

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

            await registerStudent(data);

            console.log("Student registered successfully");

            setPendingSpinner(true);
        } catch (error) {
            console.error(error);
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
                        text="Awaiting approval. Please wait..."
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

      <form
          onSubmit={handleSubmit}
          className="relative z-10 text-white px-6 py-10"
      >
        <div className="max-w-5xl mx-auto">

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Student Registration &gt; Personal Details
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

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Student Registration &gt; Academic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <select
                className="input"
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
                className="input"
                value={formData.levelOfStudy}
                onChange={(e) =>
                    setFormData({ ...formData, levelOfStudy: e.target.value })}
            >
              <option value="" disabled>Level Of Study</option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
            </select>

            <select
                className="input md:col-span-2"
                value={formData.modeOfStudy}
                onChange={(e) =>
                    setFormData({ ...formData, modeOfStudy: e.target.value })}
            >
              <option value="" disabled>Mode Of Study</option>
              <option value="Part-time">Part Time</option>
              <option value="Full-time">Full Time</option>
            </select>
          </div>

          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            Student Registration &gt; Account Creation
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

export default StudentRegistration;
