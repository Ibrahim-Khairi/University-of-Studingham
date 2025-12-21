import React from "react";

const TutorRegistration = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(comunity4.png)` }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* ================= PERSONAL DETAILS ================= */}
          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            TUTOR REGISTRATION &gt; PERSONAL DETAILS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input className="input" placeholder="FIRST NAME" />
            <input className="input" placeholder="MIDDLE NAME (if any)" />
            <input className="input" placeholder="LAST NAME" />
            <input className="input" placeholder="DD/MM/YYYY" />

            <select className="input">
              <option>GENDER</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input className="input" placeholder="EMAIL ADDRESS" />
            <input className="input" placeholder="PHONE NUMBER" />

            {/* Upload */}
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
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* ================= ACADEMIC DETAILS ================= */}
          <h2 className="text-xl font-semibold mb-4 tracking-wide">
            TUTOR REGISTRATION &gt; ACADEMIC DETAILS
          </h2>

          <div className="mb-6">
            <select className="input mb-4">
              <option>CHOOSE YOUR COURSE</option>
            </select>

            <p className="text-sm mb-2">Modules Available:</p>

            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Introduction to Networking
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Cybersecurity Basics
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Operating Systems
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Java and Data Structures
              </label>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Please select any 2 of the module(s) to proceed.
            </p>
          </div>

          {/* ================= ACCOUNT CREATION ================= */}
          <h2 className="text-xl font-semibold mb-6 tracking-wide">
            TUTOR REGISTRATION &gt; ACCOUNT CREATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input" value="1231031@uos.ac.uk" readOnly />

            <div>
              <input className="input mb-2" placeholder="CREATE PASSWORD" />
              <p className="text-xs text-gray-300">
                Your password must include at least 8 characters with a mix of
                uppercase, lowercase, numbers, and symbols.
              </p>
            </div>
          </div>

          {/* ================= SUBMIT ================= */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-12 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide transition duration-300 shadow-lg"
            >
              SUBMIT REGISTRATION
            </button>
          </div>
        </div>
      </div>

      {/* Reusable input style */}
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
