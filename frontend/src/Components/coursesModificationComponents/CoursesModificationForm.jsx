import { useEffect, useState } from "react";
import CourseAddedSuccess from "./CourseAddedSuccess.jsx";

export const CoursesModificationForm = () => {
    const [activeTab, setActiveTab] = useState("add");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseAdded, setCourseAdded] = useState(false);
    const [step, setStep] = useState(1);

    const emptyModule = { name: "", description: "" };

    const [modules, setModules] = useState({
        year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
        year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
        year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
    });

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        about: "",
        assessments: "",
        structure: "",
    });

    const isStepOneValid = formData.name.trim() && formData.code.trim() && formData.about.trim() && formData.assessments.trim() && formData.structure.trim();

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

    const handleSubmit = async () => {
        try {
            if (!formData.name.trim() || !formData.code.trim() || !formData.about.trim() || !formData.structure.trim() || !formData.assessments.trim()) {
                alert("Please complete all course details first.");
                return;
            }

            const courseRes = await fetch("http://localhost:5000/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    code: formData.code,
                    about: formData.about,
                    structure: formData.structure,
                    assessments: formData.assessments
                })
            });

            if (!courseRes.ok) console.log("Failed to create course");

            const course = await courseRes.json();

            const moduleRes = await fetch("http://localhost:5000/api/modules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: course._id,
                    modules
                })
            });

            if (!moduleRes.ok) console.log("Failed to create modules");

            await fetchCourses();
            setCourseAdded(true);

            setFormData({
                name: "",
                code: "",
                about: "",
                structure: "",
                assessments: ""
            });

            setModules({
                year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
            });

            setSelectedCourse(null);
            setStep(1);
            setActiveTab("add");
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditSelect = async (course) => {
        try {
            setSelectedCourse(course);

            setFormData({
                name: course.name,
                code: course.code,
                about: course.aboutTheCourse,
                structure: course.courseStructure,
                assessments: course.assessments
            });

            const res = await fetch(`http://localhost:5000/api/modules/course/${course._id}`);
            if (!res.ok) console.log("Failed to fetch modules for editing");

            const moduleData = await res.json();

            const grouped = {
                year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
            };

            moduleData.forEach((module) => {
                const yearKey = `year${module.year}`;

                const emptyIndex = grouped[yearKey].findIndex(
                    (module) => !module.name && !module.description
                );

                if (emptyIndex !== -1) {
                    grouped[yearKey][emptyIndex] = {
                        name: module.name,
                        description: module.description
                    };
                }
            });

            Object.keys(grouped).forEach((year) => {
                while (grouped[year].length < 4) {
                    grouped[year].push({ name: "", description: "" });
                }
            });

            setModules(grouped);
            setActiveTab("edit");
            setStep(1);
        } catch (error) {
            console.error(error);
            console.log("Failed to load course modules");
        }
    };

    const handleEditSave = async () => {
        try {
            if (!selectedCourse?._id) {
                alert("No course selected for editing");
                return;
            }

            const courseRes = await fetch (`http://localhost:5000/api/courses/${selectedCourse._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        code: formData.code,
                        about: formData.about,
                        structure: formData.structure,
                        assessments: formData.assessments
                    })
                }
            );

            if (!courseRes.ok) console.log("Failed to update course");

            const deleteRes = await fetch(`http://localhost:5000/api/modules/courses/${selectedCourse._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!deleteRes.ok) console.log("Failed to delete old modules");

            const moduleRes = await fetch("http://localhost:5000/api/modules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: selectedCourse._id,
                    modules
                })
            });

            if (!moduleRes.ok) console.log("Failed to recreate modules");

            await fetchCourses();

            setSelectedCourse(null);
            setStep(1);
            setActiveTab("edit");

            console.log("Course updated successfully");
        } catch (error) {
            console.error(error);
            console.log("Something went wrong while saving edits");
        }
    }

    return (
        <div className="bg-white rounded-3xl px-20 py-6 mt-4">
            <div className="flex justify-center gap-8 mb-10">
                <button
                    onClick={() => {
                        setActiveTab("add");
                        setSelectedCourse(null);
                        setStep(1);
                    }}
                    className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
                        activeTab === "add"
                            ? "border-b-4 border-[#4877DF] text-black"
                            : "bg-[#EBF0F3] text-[#7B7B7B]"
                    }`}
                >
                    Add Course
                </button>

                <button
                    onClick={() => setActiveTab("edit")}
                    className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
                        activeTab === "edit"
                            ? "border-b-4 border-[#4877DF] text-black"
                            : "bg-[#EBF0F3] text-[#7B7B7B]"
                    }`}
                >
                    Edit Course
                </button>
            </div>

            {activeTab === "edit" && !selectedCourse && (
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            onClick={() => handleEditSelect(course)}
                            className="cursor-pointer p-5 bg-[#F3F6FB] rounded-xl hover:bg-[#E8EEFA]"
                        >
                            <p className="font-semibold text-lg">{course.name}</p>
                            <p className="text-sm text-gray-500">{course.code}</p>
                        </div>
                    ))}
                </div>
            )}

            {courseAdded && (
                <CourseAddedSuccess
                    onAddAnother={() => {
                        setCourseAdded(false);
                        setActiveTab("add");
                    }}
                />
            )}

            {(activeTab === "add" || selectedCourse) && !courseAdded && step === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[20px] block mb-2 font-bold">
                                Course Name
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter course name"
                                className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                placeholder:text-[16px] placeholder:text-gray-500
                                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[20px] block mb-2 font-bold">
                                About the Course
                            </label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Enter course description"
                                className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                placeholder:text-[16px] placeholder:text-gray-500 resize-none
                                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[20px] block mb-2 font-bold">
                                Assessments
                            </label>
                            <textarea
                                name="assessments"
                                value={formData.assessments}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Enter course assessments"
                                className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                placeholder:text-[16px] placeholder:text-gray-500 resize-none
                                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 flex flex-col">
                        <div>
                            <label className="text-[20px] block mb-2 font-bold">
                                Course Code
                            </label>
                            <input
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Enter course code"
                                className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                placeholder:text-[16px] placeholder:text-gray-500
                                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[20px] block mb-2 font-bold">
                                Course Structure
                            </label>
                            <textarea
                                name="structure"
                                value={formData.structure}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Enter course structure"
                                className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                placeholder:text-[16px] placeholder:text-gray-500 resize-none
                                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                            />
                        </div>

                        <div className="mt-[150px] flex justify-center">
                            <button
                                onClick={() => {
                                    if (isStepOneValid) setStep(2);
                                }}
                                disabled={!isStepOneValid}
                                className={`mt-6 w-[200px] bg-[#4877DF] text-white py-2 rounded-full font-semibold transition
                                    ${isStepOneValid
                                        ? "bg-[#4877DF] text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                                `}
                            >
                                NEXT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {(activeTab === "add" || selectedCourse) && step === 2 && (
                <div className="space-y-14">
                    {[
                        { key: "year1", title: "Year One" },
                        { key: "year2", title: "Year Two" },
                        { key: "year3", title: "Year Three" }
                    ].map((year) => (
                        <div key={year.key} className="space-y-6">
                            <h2 className="text-2xl font-bold">{year.title}</h2>

                            {modules[year.key].map((module, index) => (
                                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl">
                                    <div>
                                        <label className="text-[20px] block mb-2 font-bold">
                                            Module Name
                                        </label>
                                        <input
                                            value={module.name}
                                            onChange={(e) => {
                                                const copy = { ...modules };
                                                copy[year.key][index] = {
                                                    ...copy[year.key][index],
                                                    name: e.target.value
                                                };
                                                setModules(copy);
                                            }}
                                            placeholder="Enter module name"
                                            className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
                                            placeholder:text-[16px] placeholder:text-gray-500
                                            shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[20px] block mb-2 font-bold">
                                            Module Description
                                        </label>
                                        <textarea
                                            value={module.description}
                                            onChange={(e) => {
                                                const copy = { ...modules };
                                                copy[year.key][index].description = e.target.value;
                                                setModules(copy);
                                            }}
                                            rows={3}
                                            placeholder="Enter module description"
                                            className="w-full px-4 pt-3 pb-4 rounded-xl max-h-[54px] text-[16px]
                                            placeholder:text-[16px] placeholder:text-gray-500 resize-none
                                            shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 rounded-full font-semibold bg-[#EBF0F3] text-[#333]"
                        >
                            ← Back
                        </button>

                        <button
                            onClick={() => {
                                if (selectedCourse) handleEditSave();
                                else {
                                    handleSubmit();
                                    setCourseAdded(true);
                                }
                            }}
                            className="w-[220px] bg-[#4877DF] text-white py-3 rounded-full font-semibold"
                        >
                            SAVE COURSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
