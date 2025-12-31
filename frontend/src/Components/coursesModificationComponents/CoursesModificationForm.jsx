import { useState } from "react";
import CourseAddedSuccess from "./CourseAddedSuccess.jsx";

export const CoursesModificationForm = () => {
    const [activeTab, setActiveTab] = useState("add");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseAdded, setCourseAdded] = useState(false);

    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "Computer Science",
            code: "CS301",
            about: "Introduction to computer science concepts",
            assessments: "Midterm, Final, Assignments",
            structure: "Lectures and Labs",
        },
    ]);
    console.log("COURSES STATE:", courses);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        about: "",
        assessments: "",
        structure: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (selectedCourse) {
            setCourses(
                courses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ...formData } : c
                )
            );
        } else {
            setCourses([
                ...courses,
                { id: Date.now(), ...formData },
            ]);
        }

        setFormData({
            name: "",
            code: "",
            about: "",
            assessments: "",
            structure: "",
        });
        setSelectedCourse(null);
        setActiveTab("add");
    };

    const handleEditSelect = (course) => {
        setSelectedCourse(course);
        setFormData({
            name: course.name,
            code: course.code,
            about: course.about,
            assessments: course.assessments,
            structure: course.structure,
        });
    };

    return (
        <div className="bg-white rounded-3xl px-20 py-6 mt-4">
            <div className="flex justify-center gap-8 mb-10">
                <button
                    onClick={() => {
                        setActiveTab("add");
                        setSelectedCourse(null);
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
                            key={course.id}
                            onClick={() => handleEditSelect(course)}
                            className="cursor-pointer p-5 bg-[#F3F6FB] rounded-xl hover:bg-[#E8EEFA]"
                        >
                            <p className="font-semibold text-lg">{course.name}</p>
                            <p className="text-sm text-gray-500">{course.code}</p>
                        </div>
                    ))}
                </div>
            )}

            {(activeTab === "add") && (
                courseAdded ? (
                     <CourseAddedSuccess
                        onAddAnother={() => {
                            setCourseAdded(false);
                            setActiveTab("add");

                            setFormData({
                                name: "",
                                code: "",
                                about: "",
                                assessments: "",
                                structure: ""
                            });

                            setSelectedCourse(null);
                        }}
                     />
                    ) : (
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
                                    handleSubmit();
                                    setCourseAdded(true);
                                }}
                                className="mt-6 w-[200px] bg-[#4877DF] text-white py-2 rounded-full font-semibold"
                            >
                                {selectedCourse ? "UPDATE COURSE" : "ADD COURSE"}
                            </button>
                        </div>
                    </div>
                </div>
                )
            )}
        </div>
    );
};
