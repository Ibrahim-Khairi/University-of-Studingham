import Course from "../models/Course.js";
import Module from "../models/Module.js";
import ActivityLog from "../models/ActivityLog.js";

export const createCourse = async (req, res) => {
  try {
    const { name, code, about, structure, assessments } = req.body;

    if (!name || !code || !about || !structure || !assessments)
      return res.status(400).json({ message: "All fields are required" });

    const course = await Course.create({
      name,
      code,
      aboutTheCourse: about,
      courseStructure: structure,
      assessments,
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
        name,
        code,
        aboutTheCourse: about,
        courseStructure: structure,
        assessments,
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

    if (!modules)
        return res.status(400).json({ message: "Modules data required" });

    try {
        await Module.deleteMany({ courseId });

        let incoming = [];

        if (Array.isArray(modules)) {
            incoming = modules;
        } else if (typeof modules === "object" && modules !== null) {
            Object.entries(modules).forEach(([yearKey, moduleList]) => {
                const year = Number(String(yearKey).replace("year", ""));
                if (Array.isArray(moduleList)) {
                    moduleList.forEach(m => incoming.push({ ...m, year }));
                }
            });
        }

        const formattedModules = [];
        const yearCounters = { 1: 0, 2: 0, 3: 0 };

        for (const module of incoming) {
            const name = module?.name?.trim?.();
            const description = module?.description?.trim?.();
            const year = Number(module?.year);

            if (!name || !description || ![1, 2, 3].includes(year)) continue;

            const idx = yearCounters[year];
            const startWeek = idx * 8 + 1;
            const endWeek = idx * 8 + 8;
            yearCounters[year]++;

            formattedModules.push({
                name,
                description,
                year,
                courseId,
                tutorId: null,
                startWeek,
                endWeek
            });
        }

        let inserted = [];
        if (formattedModules.length > 0) {
            inserted = await Module.insertMany(formattedModules);
        }

        res.status(200).json(inserted);
    } catch (error) {
        res.status(500).json({ message: "Failed to replace modules" });
    }
};