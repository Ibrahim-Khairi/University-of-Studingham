import Course from "../models/Course.js";
import ActivityLog from "../models/ActivityLog.js";

export const createCourse = async (req, res) => {
    try {
        const { name, code, about, structure, assessments } = req.body;

        if (!name || !code || !about || !structure || !assessments) return res.status(400).json({ message: "All fields are required" });

        const course = await Course.create({
            name, code,
            aboutTheCourse: about,
            courseStructure: structure,
            assessments
        });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "CREATED_COURSE",
            target: {
                id: course._id,
                model: "Course",
            },
            description: `Created course "${course.name}"`,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { name, code, about, structure, assessments } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                name, code,
                aboutTheCourse: about,
                courseStructure: structure,
                assessments
            },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) res.status(404).json({ message: "Course not found" });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "UPDATED_COURSE",
            target: {
                id: updatedCourse._id,
                model: "Course",
            },
            description: `Updated course "${updatedCourse.name}"`,
        });

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Failed to update course" });
    }
};