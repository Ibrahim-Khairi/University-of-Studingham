import Course from "../models/Course.js";
import Module from "../models/Module.js";
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

export const replaceCourseModules = async (req, res) => {
    const { courseId } = req.params;
    const { modules } = req.body;

    if (!modules) return res.status(400).json({ message: "Modules data required" });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Module.deleteMany({ courseId }).session(session);

        const formattedModules = [];

        Object.entries(modules).forEach(([yearKey, moduleList]) => {
            const year = Number(yearKey.replace("year", ""));

            moduleList.forEach((module, index) => {
                if (module.name && module.description) {
                    formattedModules.push({
                        name: module.name,
                        description: module.description,
                        year,
                        courseId,
                        tutorId: null,
                        startWeek: index * 8 + 1,
                        endWeek: index * 8 + 8
                    });
                }
            });
        });

        if (formattedModules.length > 0) {
            await Module.insertMany(formattedModules, { session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Modules replaced successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Failed to replace modules" });
    }
}