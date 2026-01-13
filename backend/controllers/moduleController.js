import Module from "../models/Module.js";

export const createModules = async (req, res) => {
    try {
        const { modules, courseId } = req.body;
        if (!courseId || !modules)
            return res.status(400).json({ message: "Missing data" });

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
                        endWeek: index * 8 + 8,
                    });
                }
            });
        });

        const createdModules = await Module.insertMany(formattedModules);
        res.status(201).json(createdModules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getModulesByCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await Module.find({ courseId });
    res.json(modules);
};

export const deleteModulesByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Module.deleteMany({ courseId });
        res.status(200).json({ message: "Modules deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete modules" });
    }
};

export const createModulesByBulk = async (req, res) => {
    try {
        const { courseId, modules } = req.body;
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
                        endWeek: index * 8 + 8,
                    });
                }
            });
        });

        await Module.insertMany(formattedModules);
        res.status(201).json({ message: "Modules created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to create modules" });
    }
};

export const toggleVisibility = async (req, res) => {
    try {
        const { moduleId } = req.params;

        const module = await Module.findById(moduleId);
        if (!module) return res.status(404).json({ message: "Module not found" });

        const updatedModule = await Module.findByIdAndUpdate(
            moduleId,
            { isVisible: !module.isVisible },
            { new: true }
        );

        res.json({
            message: "Success",
            isVisible: updatedModule.isVisible,
        });
    } catch (error) {
        res.status(500).json({ message: "Toggle failed" });
    }
};

export const updateCurriculum = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { weeks } = req.body;

        const parsedWeeks = JSON.parse(weeks);

        const module = await Module.findById(moduleId);
        if (!module) return res.status(404).json({ message: "Module not found" });

        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
                const parts = file.fieldname.split("_");
                const weekIdx = parseInt(parts[2]) - 1;
                const slotIdx = parseInt(parts[4]);

                if (parsedWeeks[weekIdx]?.materials[slotIdx]) {
                    parsedWeeks[weekIdx].materials[
                        slotIdx
                        ].fileUrl = `/uploads/curriculum/${file.filename}`;
                }
            });
        }

        module.weeks = parsedWeeks;
        await module.save();

        res.json({ message: "Curriculum published successfully", module });
    } catch (error) {
        res.status(500).json({ message: "Failed to update curriculum" });
    }
};