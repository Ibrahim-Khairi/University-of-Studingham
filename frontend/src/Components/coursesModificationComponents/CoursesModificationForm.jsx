import { useEffect, useState } from "react";
import CourseAddedSuccess from "./CourseAddedSuccess.jsx";
import CourseTimetableSetup from "./CourseTimetableSetup.jsx";

export const CoursesModificationForm = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseAdded, setCourseAdded] = useState(false);
  const [step, setStep] = useState(1);

  const emptyModule = { name: "", description: "", _id: null };

  const [modules, setModules] = useState({
    year1: Array(4)
      .fill(null)
      .map(() => ({ ...emptyModule })),
    year2: Array(4)
      .fill(null)
      .map(() => ({ ...emptyModule })),
    year3: Array(4)
      .fill(null)
      .map(() => ({ ...emptyModule })),
  });

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    about: "",
    assessments: "",
    structure: "",
  });

  const [lecturePatterns, setLecturePatterns] = useState([]);

  const isStepOneValid =
    formData.name.trim() &&
    formData.code.trim() &&
    formData.about.trim() &&
    formData.assessments.trim() &&
    formData.structure.trim();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/setup/courses");
      if (!res.ok) console.log("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeTab === "edit") fetchCourses();
  }, [activeTab]);

  // FIXED: Save logic now handles both Create (POST) and Update (PUT)
  const saveCourseAndModules = async () => {
    if (!isStepOneValid) {
      alert("Please complete all course details first.");
      return null;
    }

    const token = localStorage.getItem("accessToken");

    // Determine if we are updating an existing course or creating a new one
    const isUpdating = !!selectedCourse?._id;
    const url = isUpdating
      ? `http://localhost:5000/api/courses/${selectedCourse._id}`
      : "http://localhost:5000/api/courses/";
    const method = isUpdating ? "PUT" : "POST";

    console.log(`${method}ing course:`, formData);

    // 1️⃣ Create or Update course
    const courseRes = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        code: formData.code,
        about: formData.about,
        structure: formData.structure,
        assessments: formData.assessments,
      }),
    });

    if (!courseRes.ok) {
      const errorText = await courseRes.text();
      throw new Error(`Failed to save course: ${errorText}`);
    }

    const course = await courseRes.json();

    // 2️⃣ Flatten modules - include existing IDs to prevent module duplication too
    const flattenedModules = [
      ...modules.year1.map((m) => ({ ...m, year: 1 })),
      ...modules.year2.map((m) => ({ ...m, year: 2 })),
      ...modules.year3.map((m) => ({ ...m, year: 3 })),
    ];

    // 3️⃣ Save modules (Using the course ID returned from step 1)
    const moduleRes = await fetch(
      `http://localhost:5000/api/courses/${course._id}/modules`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ modules: flattenedModules }),
      }
    );

    if (!moduleRes.ok) {
      const errorText = await moduleRes.text();
      throw new Error(`Failed to save modules: ${errorText}`);
    }

    const savedModules = await moduleRes.json();

    // 4️⃣ Reshape for frontend state
    setModules({
      year1: savedModules.filter((m) => m.year === 1),
      year2: savedModules.filter((m) => m.year === 2),
      year3: savedModules.filter((m) => m.year === 3),
    });

    return course;
  };

  // FINAL SUBMIT (after timetable setup)
  const handleSubmit = async () => {
    try {
      if (!selectedCourse?._id) {
        alert("Course not saved properly. Please restart.");
        return;
      }

      // Save lecture patterns
      const token = localStorage.getItem("accessToken");
      const lectureRes = await fetch(
        `http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            academicYearStart: "2025-09-22",
            patterns: lecturePatterns,
          }),
        }
      );

      if (!lectureRes.ok) throw new Error("Failed to save lecture patterns");

      await fetchCourses();
      setCourseAdded(true);
      resetFormState();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit course");
    }
  };

  const resetFormState = () => {
    setFormData({
      name: "",
      code: "",
      about: "",
      assessments: "",
      structure: "",
    });
    setModules({
      year1: Array(4)
        .fill(null)
        .map(() => ({ ...emptyModule })),
      year2: Array(4)
        .fill(null)
        .map(() => ({ ...emptyModule })),
      year3: Array(4)
        .fill(null)
        .map(() => ({ ...emptyModule })),
    });
    setSelectedCourse(null);
    setStep(1);
  };

  const handleEditSelect = async (course) => {
    try {
      setSelectedCourse(course);
      setFormData({
        name: course.name,
        code: course.code,
        about: course.aboutTheCourse,
        structure: course.courseStructure,
        assessments: course.assessments,
      });

      const res = await fetch(
        `http://localhost:5000/api/modules/course/${course._id}`
      );
      const moduleData = await res.json();

      const grouped = {
        year1: Array(4)
          .fill(null)
          .map(() => ({ ...emptyModule })),
        year2: Array(4)
          .fill(null)
          .map(() => ({ ...emptyModule })),
        year3: Array(4)
          .fill(null)
          .map(() => ({ ...emptyModule })),
      };

      moduleData.forEach((mod, idx) => {
        const yearKey = `year${mod.year}`;
        const firstEmpty = grouped[yearKey].findIndex((m) => !m.name);
        if (firstEmpty !== -1) {
          grouped[yearKey][firstEmpty] = {
            _id: mod._id,
            name: mod.name,
            description: mod.description,
          };
        }
      });

      setModules(grouped);
      setStep(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl px-20 py-6 mt-4">
      {/* TAB SELECT */}
      <div className="flex justify-center gap-8 mb-10">
        <button
          onClick={() => {
            setActiveTab("add");
            resetFormState();
          }}
          className={`h-[52px] px-8 font-semibold flex items-center justify-center transition-all ${
            activeTab === "add"
              ? "border-b-4 border-[#4877DF] text-black"
              : "bg-[#EBF0F3] text-[#7B7B7B]"
          }`}
        >
          Add Course
        </button>
        <button
          onClick={() => {
            setActiveTab("edit");
            setSelectedCourse(null);
            setStep(1);
          }}
          className={`h-[52px] px-8 font-semibold flex items-center justify-center transition-all ${
            activeTab === "edit"
              ? "border-b-4 border-[#4877DF] text-black"
              : "bg-[#EBF0F3] text-[#7B7B7B]"
          }`}
        >
          Edit Course
        </button>
      </div>

      {courseAdded && (
        <CourseAddedSuccess
          onAddAnother={() => {
            setCourseAdded(false);
            setActiveTab("add");
          }}
        />
      )}

      {!courseAdded && activeTab === "edit" && !selectedCourse ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Select a course to edit:</h2>
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => handleEditSelect(course)}
              className="p-5 bg-[#F3F6FB] rounded-xl hover:bg-[#E8EEFA] border-2 border-transparent hover:border-[#4877DF] cursor-pointer transition-all"
            >
              <p className="font-bold text-lg">{course.name}</p>
              <p className="text-sm text-gray-500 font-semibold">
                {course.code}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {!courseAdded && step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div className="space-y-6">
                <div>
                  <label className="text-[20px] block mb-2 font-bold text-gray-700">
                    Course Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] outline-none focus:ring-2 ring-[#4877DF]"
                  />
                </div>
                <div>
                  <label className="text-[20px] block mb-2 font-bold text-gray-700">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-[20px] block mb-2 font-bold text-gray-700">
                    Assessments
                  </label>
                  <textarea
                    name="assessments"
                    value={formData.assessments}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] outline-none resize-none"
                  />
                </div>
              </div>
              <div className="space-y-6 flex flex-col">
                <div>
                  <label className="text-[20px] block mb-2 font-bold text-gray-700">
                    Course Code
                  </label>
                  <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="text-[20px] block mb-2 font-bold text-gray-700">
                    Structure
                  </label>
                  <textarea
                    name="structure"
                    value={formData.structure}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] outline-none resize-none"
                  />
                </div>
                <div className="mt-auto flex justify-center pb-10">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStepOneValid}
                    className={`w-[250px] py-3 rounded-full font-bold text-white transition-all shadow-lg ${
                      isStepOneValid
                        ? "bg-[#4877DF] hover:bg-[#365fba]"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    NEXT: SET MODULES
                  </button>
                </div>
              </div>
            </div>
          )}

          {!courseAdded && step === 2 && (
            <div className="space-y-12">
              {["year1", "year2", "year3"].map((yKey, idx) => (
                <div
                  key={yKey}
                  className="space-y-6 bg-gray-50 p-8 rounded-3xl"
                >
                  <h2 className="text-2xl font-black uppercase text-gray-400 tracking-widest">
                    Year {idx + 1}
                  </h2>
                  {modules[yKey].map((module, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                      <input
                        value={module.name}
                        placeholder="Module Name"
                        onChange={(e) => {
                          const copy = { ...modules };
                          copy[yKey][i].name = e.target.value;
                          setModules(copy);
                        }}
                        className="w-full px-4 py-3 rounded-xl shadow-sm outline-none border focus:border-[#4877DF]"
                      />
                      <textarea
                        value={module.description}
                        placeholder="Short Description"
                        onChange={(e) => {
                          const copy = { ...modules };
                          copy[yKey][i].description = e.target.value;
                          setModules(copy);
                        }}
                        className="w-full px-4 py-2 rounded-xl shadow-sm outline-none border focus:border-[#4877DF] h-[48px] resize-none"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="px-10 py-3 rounded-full font-bold bg-gray-200 hover:bg-gray-300 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={async () => {
                    const course = await saveCourseAndModules();
                    if (course) {
                      setSelectedCourse(course);
                      setStep(3);
                    }
                  }}
                  className="px-10 py-3 bg-[#4877DF] text-white rounded-full font-bold shadow-lg hover:bg-[#365fba]"
                >
                  NEXT: SET TIMETABLE
                </button>
              </div>
            </div>
          )}

          {!courseAdded && step === 3 && (
            <div className="animate-in fade-in duration-500">
              <CourseTimetableSetup
                selectedCourse={selectedCourse}
                modules={modules}
                onComplete={(patterns) => setLecturePatterns(patterns)}
              />
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-3 rounded-full font-bold bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-12 py-4 bg-[#4877DF] text-white rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Save Full Course
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
