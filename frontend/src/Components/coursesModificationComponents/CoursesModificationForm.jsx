// import { useEffect, useState } from "react";
// import CourseAddedSuccess from "./CourseAddedSuccess.jsx";
// import CourseTimetableSetup from "./CourseTimetableSetup.jsx";
//
// export const CoursesModificationForm = () => {
//     const [activeTab, setActiveTab] = useState("add");
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [courseAdded, setCourseAdded] = useState(false);
//     const [step, setStep] = useState(1);
//
//     const emptyModule = { name: "", description: "", _id: null };
//
//     const [modules, setModules] = useState({
//         year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
//         year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
//         year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
//     });
//
//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         about: "",
//         assessments: "",
//         structure: ""
//     });
//
//     const [lecturePatterns, setLecturePatterns] = useState([]);
//
//     const isStepOneValid =
//         formData.name.trim() &&
//         formData.code.trim() &&
//         formData.about.trim() &&
//         formData.assessments.trim() &&
//         formData.structure.trim();
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const fetchCourses = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/setup/courses");
//             if (!res.ok) console.log("Failed to fetch courses");
//
//             const data = await res.json();
//             setCourses(data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     useEffect(() => {
//         if (activeTab === "edit") fetchCourses();
//     }, [activeTab]);
//
//     const saveCourseAndModules = async () => {
//         if (!isStepOneValid) {
//             alert("Please complete all course details first.");
//             return;
//         }
//
//         const token = localStorage.getItem("accessToken");
//
//         const courseRes = await fetch("http://localhost:5000/api/courses", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 name: formData.name,
//                 code: formData.code,
//                 aboutTheCourse: formData.about,
//                 courseStructure: formData.structure,
//                 assessments: formData.assessments
//             })
//         });
//
//         if (!courseRes.ok) console.log("Failed to create course");
//         const course = await courseRes.json();
//
//         const moduleRes = await fetch(`http://localhost:5000/api/courses/${course._id}/modules`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ modules })
//         });
//
//         if (!moduleRes.ok) console.log("Failed to create modules");
//
//         const savedModules = await moduleRes.json();
//         setModules(savedModules);
//
//         return course;
//     }
//
//     const handleSubmit = async () => {
//         try {
//             if (!selectedCourse?._id) {
//                 alert("Course not saved properly. Please restart");
//                 return;
//             }
//
//             const isValidTimetable = lecturePatterns.every(pattern =>
//                 pattern.moduleId &&
//                 pattern.year &&
//                 pattern.weekBlock?.start &&
//                 pattern.weekBlock?.end &&
//                 Array.isArray(pattern.pattern) &&
//                 pattern.pattern.length > 0 &&
//                 pattern.pattern.every(slot =>
//                     slot.day &&
//                     slot.startTime &&
//                     typeof slot.durationHours === "number"
//                 )
//             );
//
//             if (!isValidTimetable) {
//                 alert("Timetable setup is incomplete or invalid. Please review all modules.");
//                 return;
//             }
//
//             const lectureRes = await fetch(`http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     academicYearStart: "2025-09-22",
//                     patterns: lecturePatterns
//                 })
//             });
//
//             if (!lectureRes.ok) console.log("Failed to create lecture patterns");
//
//             await fetchCourses();
//             setCourseAdded(true);
//
//             setFormData({
//                 name: "",
//                 code: "",
//                 about: "",
//                 assessments: "",
//                 structure: ""
//             });
//
//             setModules({
//                 year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
//                 year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
//                 year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
//             });
//
//             setSelectedCourse(null);
//             setStep(1);
//             setActiveTab("add");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to create course");
//         }
//     };
//
//     const handleEditSelect = async (course) => {
//         try {
//             setSelectedCourse(course);
//
//             setFormData({
//                 name: course.name,
//                 code: course.code,
//                 about: course.aboutTheCourse,
//                 structure: course.courseStructure,
//                 assessments: course.assessments
//             });
//
//             const res = await fetch(`http://localhost:5000/api/modules/course/${course._id}`);
//             if (!res.ok) console.log("Failed to fetch modules for editing");
//
//             const moduleData = await res.json();
//
//             const grouped = {
//                 year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
//                 year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
//                 year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
//             };
//
//             moduleData.forEach((module) => {
//                 const yearKey = `year${module.year}`;
//                 const emptyIndex = grouped[yearKey].findIndex(
//                     (module) => !module.name && !module.description
//                 );
//
//                 if (emptyIndex !== -1) {
//                     grouped[yearKey][emptyIndex] = {
//                         _id: module._id || null,
//                         name: module.name,
//                         description: module.description
//                     };
//                 }
//             });
//
//             setModules(grouped);
//             setStep(2);
//             setActiveTab("edit");
//         } catch (error) {
//             console.error(error);
//             console.log("Failed to load course modules");
//         }
//     };
//
//     const handleEditSave = async () => {
//         try {
//             if (!selectedCourse?._id) {
//                 alert("No course selected for editing");
//                 return;
//             }
//
//             const token = localStorage.getItem("accessToken");
//
//             const courseRes = await fetch (`http://localhost:5000/api/courses/${selectedCourse._id}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         name: formData.name,
//                         code: formData.code,
//                         about: formData.about,
//                         structure: formData.structure,
//                         assessments: formData.assessments
//                     })
//                 }
//             );
//
//             if (!courseRes.ok) console.log("Failed to update course");
//
//             const moduleRes = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}/modules`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ modules })
//             });
//
//             if (!moduleRes.ok) console.log("Failed to update modules");
//
//             const lectureRes = await fetch(`http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     academicYearStart: "2025-09-22",
//                     patterns: lecturePatterns
//                 })
//             });
//
//             if (!lectureRes.ok) console.log("Failed to update lecture patterns");
//
//             await fetchCourses();
//             setSelectedCourse(null);
//             setStep(1);
//             setActiveTab("edit");
//             console.log("Course updated successfully");
//         } catch (error) {
//             console.error(error);
//             console.log("Something went wrong while saving edits");
//         }
//     };
//
//     const isEditing = Boolean(selectedCourse);
//
//     return (
//         <div className="bg-white rounded-3xl px-20 py-6 mt-4">
//             <div className="flex justify-center gap-8 mb-10">
//                 <button
//                     onClick={() => {
//                         setActiveTab("add");
//                         setSelectedCourse(null);
//                         setStep(1);
//                     }}
//                     className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
//                         activeTab === "add"
//                             ? "border-b-4 border-[#4877DF] text-black"
//                             : "bg-[#EBF0F3] text-[#7B7B7B]"
//                     }`}
//                 >
//                     Add Course
//                 </button>
//
//                 <button
//                     onClick={() => setActiveTab("edit")}
//                     className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
//                         activeTab === "edit"
//                             ? "border-b-4 border-[#4877DF] text-black"
//                             : "bg-[#EBF0F3] text-[#7B7B7B]"
//                     }`}
//                 >
//                     Edit Course
//                 </button>
//             </div>
//
//             {courseAdded && (
//                 <CourseAddedSuccess
//                     onAddAnother={() => {
//                         setCourseAdded(false);
//                         setActiveTab("add");
//                     }}
//                 />
//             )}
//
//             {(activeTab === "add" || selectedCourse) && !courseAdded && step === 1 && (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
//                     <div className="space-y-6">
//                         <div>
//                             <label className="text-[20px] block mb-2 font-bold">
//                                 Course Name
//                             </label>
//                             <input
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 placeholder="Enter course name"
//                                 className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                 placeholder:text-[16px] placeholder:text-gray-500
//                                 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="text-[20px] block mb-2 font-bold">
//                                 About the Course
//                             </label>
//                             <textarea
//                                 name="about"
//                                 value={formData.about}
//                                 onChange={handleChange}
//                                 rows={5}
//                                 placeholder="Enter course description"
//                                 className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                 placeholder:text-[16px] placeholder:text-gray-500 resize-none
//                                 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="text-[20px] block mb-2 font-bold">
//                                 Assessments
//                             </label>
//                             <textarea
//                                 name="assessments"
//                                 value={formData.assessments}
//                                 onChange={handleChange}
//                                 rows={5}
//                                 placeholder="Enter course assessments"
//                                 className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                 placeholder:text-[16px] placeholder:text-gray-500 resize-none
//                                 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                             />
//                         </div>
//                     </div>
//
//                     <div className="space-y-6 flex flex-col">
//                         <div>
//                             <label className="text-[20px] block mb-2 font-bold">
//                                 Course Code
//                             </label>
//                             <input
//                                 name="code"
//                                 value={formData.code}
//                                 onChange={handleChange}
//                                 placeholder="Enter course code"
//                                 className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                 placeholder:text-[16px] placeholder:text-gray-500
//                                 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="text-[20px] block mb-2 font-bold">
//                                 Course Structure
//                             </label>
//                             <textarea
//                                 name="structure"
//                                 value={formData.structure}
//                                 onChange={handleChange}
//                                 rows={5}
//                                 placeholder="Enter course structure"
//                                 className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                 placeholder:text-[16px] placeholder:text-gray-500 resize-none
//                                 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                             />
//                         </div>
//
//                         <div className="mt-[150px] flex justify-center">
//                             <button
//                                 onClick={() => {
//                                     if (isStepOneValid) setStep(2);
//                                 }}
//                                 disabled={!isStepOneValid}
//                                 className={`mt-6 w-[200px] bg-[#4877DF] text-white py-2 rounded-full font-semibold transition
//                                     ${isStepOneValid
//                                     ? "bg-[#4877DF] text-white"
//                                     : "bg-gray-300 text-gray-500 cursor-not-allowed"}
//                                 `}
//                             >
//                                 NEXT: SET MODULES
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {(activeTab === "add" || selectedCourse) && step === 2 && (
//                 <div className="space-y-14">
//                     {[
//                         { key: "year1", title: "Year One" },
//                         { key: "year2", title: "Year Two" },
//                         { key: "year3", title: "Year Three" }
//                     ].map((year) => (
//                         <div key={year.key} className="space-y-6">
//                             <h2 className="text-2xl font-bold">{year.title}</h2>
//
//                             {modules[year.key].map((module, index) => (
//                                 <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl">
//                                     <div>
//                                         <label className="text-[20px] block mb-2 font-bold">
//                                             Module Name
//                                         </label>
//                                         <input
//                                             value={module.name}
//                                             onChange={(e) => {
//                                                 const copy = { ...modules };
//                                                 copy[year.key][index] = {
//                                                     ...copy[year.key][index],
//                                                     name: e.target.value
//                                                 };
//                                                 setModules(copy);
//                                             }}
//                                             placeholder="Enter module name"
//                                             className="w-full px-4 pt-3 pb-4 rounded-xl text-[16px]
//                                             placeholder:text-[16px] placeholder:text-gray-500
//                                             shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                                         />
//                                     </div>
//
//                                     <div>
//                                         <label className="text-[20px] block mb-2 font-bold">
//                                             Module Description
//                                         </label>
//                                         <textarea
//                                             value={module.description}
//                                             onChange={(e) => {
//                                                 const copy = { ...modules };
//                                                 copy[year.key][index].description = e.target.value;
//                                                 setModules(copy);
//                                             }}
//                                             rows={3}
//                                             placeholder="Enter module description"
//                                             className="w-full px-4 pt-3 pb-4 rounded-xl max-h-[54px] text-[16px]
//                                             placeholder:text-[16px] placeholder:text-gray-500 resize-none
//                                             shadow-[0px_0px_10px_rgba(0,0,0,0.25)] outline-none"
//                                         />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//
//                     <div className="flex justify-between items-center">
//                         <button
//                             onClick={() => setStep(1)}
//                             className="px-6 py-2 rounded-full font-semibold bg-[#EBF0F3] text-[#333]"
//                         >
//                             ← Back
//                         </button>
//
//                         <button
//                             onClick={() => {
//                                 setStep(3);
//                             }}
//                             className="w-[220px] bg-[#4877DF] text-white py-3 rounded-full font-semibold"
//                         >
//                             NEXT: SET TIMETABLE
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {step === 3 && (
//                 <>
//                     <CourseTimetableSetup
//                         selectedCourse={selectedCourse}
//                         modules={modules}
//                         onComplete={(patterns) => {
//                             setLecturePatterns(patterns);
//                         }}
//                     />
//
//                     <div className="flex justify-between items-center">
//                         <button
//                             onClick={() => setStep(2)}
//                             className="px-6 py-2 rounded-full font-semibold bg-[#EBF0F3] text-[#333]"
//                         >
//                             ← Back
//                         </button>
//
//                         <button
//                             onClick={async () => {
//                                 if (isEditing) {
//                                     await handleEditSave();
//                                 } else {
//                                     await handleSubmit();
//                                     setCourseAdded(true);
//                                 }
//                             }}
//                             className="w-[220px] bg-[#4877DF] text-white py-3 rounded-full font-semibold"
//                         >
//                             SAVE COURSE
//                         </button>
//                     </div>
//                 </>
//             )}
//
//             {activeTab === "edit" && !selectedCourse && (
//                 <div className="space-y-4">
//                     {courses.map((course) => (
//                         <div
//                             key={course._id}
//                             onClick={() => handleEditSelect(course)}
//                             className="cursor-pointer p-5 bg-[#F3F6FB] rounded-xl hover:bg-[#E8EEFA]"
//                         >
//                             <p className="font-semibold text-lg">{course.name}</p>
//                             <p className="text-sm text-gray-500">{course.code}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

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
        year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
        year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
        year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
    });

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        about: "",
        assessments: "",
        structure: ""
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

    // SAVE COURSE + MODULES for step 3
    const saveCourseAndModules = async () => {
        if (!isStepOneValid) {
            alert("Please complete all course details first.");
            return null;
        }

        const token = localStorage.getItem("accessToken");

        console.log("Submitting course:", formData);
        // 1️⃣ Create course
        const courseRes = await fetch("http://localhost:5000/api/courses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                code: formData.code,
                about: formData.about,
                structure: formData.structure,
                assessments: formData.assessments
            })
        });

        if (!courseRes.ok) {
            const errorText = await courseRes.text();
            throw new Error(`Failed to create course: ${errorText}`);
        }

        const course = await courseRes.json();

        // 2️⃣ Flatten modules
        const flattenedModules = [
            ...modules.year1.map(m => ({ ...m, year: 1 })),
            ...modules.year2.map(m => ({ ...m, year: 2 })),
            ...modules.year3.map(m => ({ ...m, year: 3 }))
        ];

        // 3️⃣ Save modules
        const moduleRes = await fetch(`http://localhost:5000/api/courses/${course._id}/modules`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ modules: flattenedModules }) // important: flattened array
        });

        if (!moduleRes.ok) {
            const errorText = await moduleRes.text();
            throw new Error(`Failed to save modules: ${errorText}`);
        }

        const savedModules = await moduleRes.json();

        // 4️⃣ Reshape for frontend state
        setModules({
            year1: savedModules.filter(m => m.year === 1),
            year2: savedModules.filter(m => m.year === 2),
            year3: savedModules.filter(m => m.year === 3)
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

            // Validate lecture patterns
            const isValidTimetable = lecturePatterns.every(pattern =>
                pattern.moduleId &&
                pattern.year &&
                pattern.weekBlock?.start &&
                pattern.weekBlock?.end &&
                Array.isArray(pattern.pattern) &&
                pattern.pattern.length > 0 &&
                pattern.pattern.every(slot =>
                    slot.day &&
                    slot.startTime &&
                    typeof slot.durationHours === "number"
                )
            );

            if (!isValidTimetable) {
                alert("Timetable setup is incomplete or invalid. Please review all modules.");
                return;
            }

            // Save lecture patterns
            const lectureRes = await fetch(
                `http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        academicYearStart: "2025-09-22",
                        patterns: lecturePatterns
                    })
                }
            );

            if (!lectureRes.ok) throw new Error("Failed to save lecture patterns");

            // REFRESH COURSES
            await fetchCourses();
            setCourseAdded(true);

            // RESET FORM
            setFormData({
                name: "",
                code: "",
                about: "",
                assessments: "",
                structure: ""
            });

            setModules({
                year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
            });

            setSelectedCourse(null);
            setStep(1);
            setActiveTab("add");
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to submit course");
        }
    };

    // EDIT FLOW
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

            // Load modules
            const res = await fetch(`http://localhost:5000/api/modules/course/${course._id}`);
            if (!res.ok) console.log("Failed to fetch modules for editing");

            const moduleData = await res.json();

            const grouped = {
                year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
                year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
            };

            moduleData.forEach((mod) => {
                const yearKey = `year${mod.year}`;
                const emptyIndex = grouped[yearKey].findIndex(
                    (m) => !m.name && !m.description
                );
                if (emptyIndex !== -1) {
                    grouped[yearKey][emptyIndex] = {
                        _id: mod._id || null,
                        name: mod.name,
                        description: mod.description
                    };
                }
            });

            setModules(grouped);
            setStep(2);
            setActiveTab("edit");
        } catch (err) {
            console.error(err);
            alert("Failed to load course for editing");
        }
    };

    const handleEditSave = async () => {
        try {
            if (!selectedCourse?._id) {
                alert("No course selected for editing");
                return;
            }

            const token = localStorage.getItem("accessToken");

            // Update course
            const courseRes = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    code: formData.code,
                    about: formData.about,
                    structure: formData.structure,
                    assessments: formData.assessments
                })
            });

            if (!courseRes.ok) throw new Error("Failed to update course");

            // Update modules
            const moduleRes = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}/modules`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ modules })
            });

            if (!moduleRes.ok) throw new Error("Failed to update modules");

            // Save lecture patterns
            const lectureRes = await fetch(
                `http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        academicYearStart: "2025-09-22",
                        patterns: lecturePatterns
                    })
                }
            );

            if (!lectureRes.ok) throw new Error("Failed to update lecture patterns");

            await fetchCourses();
            setSelectedCourse(null);
            setStep(1);
            setActiveTab("edit");
            alert("Course updated successfully");
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to save edits");
        }
    };

    const isEditing = Boolean(selectedCourse);

    return (
        <div className="bg-white rounded-3xl px-20 py-6 mt-4">
            {/* TAB SELECT */}
            <div className="flex justify-center gap-8 mb-10">
                <button
                    onClick={() => { setActiveTab("add"); setSelectedCourse(null); setStep(1); }}
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

            {/* SUCCESS MESSAGE */}
            {courseAdded && (
                <CourseAddedSuccess
                    onAddAnother={() => { setCourseAdded(false); setActiveTab("add"); }}
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
                                NEXT: SET MODULES
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
                            onClick={async () => {
                                if (!isStepOneValid) {
                                    alert("Please complete course details first.");
                                    return;
                                }

                                try {
                                    // Save course + modules before moving to timetable
                                    const course = await saveCourseAndModules();
                                    if (!course || !course._id) {
                                        alert("Failed to save course. Please try again.");
                                        return;
                                    }

                                    setSelectedCourse(course); // so Step 3 knows the course ID
                                    setStep(3);
                                } catch (err) {
                                    console.error(err);
                                    alert("Failed to save course and modules before timetable.");
                                }
                            }}
                            className="w-[220px] bg-[#4877DF] text-white py-3 rounded-full font-semibold"
                        >
                            NEXT: SET TIMETABLE
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <>
                    <CourseTimetableSetup
                        selectedCourse={selectedCourse}
                        modules={modules}
                        onComplete={(patterns) => {
                            setLecturePatterns(patterns);
                        }}
                    />

                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setStep(2)}
                            className="px-6 py-2 rounded-full font-semibold bg-[#EBF0F3] text-[#333]"
                        >
                            ← Back
                        </button>

                        <button
                            onClick={async () => {
                                if (!selectedCourse?._id) {
                                    alert("No course selected. Please restart.");
                                    return;
                                }

                                try {
                                    // Validate timetable
                                    const isValidTimetable = lecturePatterns.every(pattern =>
                                        pattern.moduleId &&
                                        pattern.year &&
                                        pattern.weekBlock?.start &&
                                        pattern.weekBlock?.end &&
                                        Array.isArray(pattern.pattern) &&
                                        pattern.pattern.length > 0 &&
                                        pattern.pattern.every(slot =>
                                            slot.day &&
                                            slot.startTime &&
                                            typeof slot.durationHours === "number"
                                        )
                                    );

                                    if (!isValidTimetable) {
                                        alert("Timetable setup is incomplete or invalid.");
                                        return;
                                    }

                                    // Save lecture patterns
                                    const token = localStorage.getItem("accessToken");
                                    const res = await fetch(
                                        `http://localhost:5000/api/lecture-patterns/course/${selectedCourse._id}`,
                                        {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: token ? `Bearer ${token}` : undefined
                                            },
                                            body: JSON.stringify({ academicYearStart: "2025-09-22", patterns: lecturePatterns })
                                        }
                                    );

                                    if (!res.ok) throw new Error("Failed to save timetable.");

                                    alert("Course and timetable saved successfully!");
                                    setCourseAdded(true);
                                    setStep(1);
                                    setSelectedCourse(null);
                                    setFormData({
                                        name: "",
                                        code: "",
                                        about: "",
                                        assessments: "",
                                        structure: ""
                                    });
                                    setModules({
                                        year1: Array(4).fill(null).map(() => ({ ...emptyModule })),
                                        year2: Array(4).fill(null).map(() => ({ ...emptyModule })),
                                        year3: Array(4).fill(null).map(() => ({ ...emptyModule }))
                                    });
                                } catch (err) {
                                    console.error(err);
                                    alert(err.message);
                                }
                            }}
                            className="w-[220px] bg-[#4877DF] text-white py-3 rounded-full font-semibold"
                        >
                            SAVE COURSE
                        </button>
                    </div>
                </>
            )}

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
        </div>
    );
};