import Module from "../models/Module.js";

// --- YOUR EXISTING FUNCTIONS (Keep these) ---

export const createModules = async (req, res) => {
  try {
    const { modules, courseId } = req.body;
    if (!courseId || !modules)
      return res.status(400).json({ message: "Missing data" });
    const formattedModules = [];
    Object.entries(modules).forEach(([yearKey, moduleList]) => {
      const year = Number(yearKey.replace("year", ""));
      moduleList.forEach((module) => {
        if (module.name && module.description) {
          formattedModules.push({
            name: module.name,
            description: module.description,
            year,
            courseId,
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
      moduleList.forEach((module) => {
        if (module.name && module.description) {
          formattedModules.push({
            name: module.name,
            description: module.description,
            year,
            courseId,
            tutorId: null,
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

// --- NEW PROFESSIONAL MOODLE FUNCTIONS (Add these) ---

/**
 * 1. Toggle Visibility
 * Allows Admin to lock/unlock a module for students
 */
export const toggleVisibility = async (req, res) => {
  try {
    const { moduleId } = req.params;

    // 1. Find the current module
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    // 2. Toggle the value and update the DB
    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { isVisible: !module.isVisible },
      { new: true } // This returns the updated document
    );

    console.log("Module visibility changed to:", updatedModule.isVisible);

    res.json({
      message: "Success",
      isVisible: updatedModule.isVisible,
    });
  } catch (error) {
    console.error("Toggle Visibility Error:", error);
    res.status(500).json({ message: "Toggle failed" });
  }
};

/**
 * 2. Update 8-Week Curriculum
 * Saves the Topics and File Paths for the 8-week structure
 */
export const updateCurriculum = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { weeks } = req.body;

    // The frontend sends week descriptions as a JSON string
    const parsedWeeks = JSON.parse(weeks);

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    // Handle File Uploads
    // We look for files in req.files (populated by Multer)
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        // Expected fieldname format: "file_week_1_slot_0"
        const parts = file.fieldname.split("_");
        const weekIdx = parseInt(parts[2]) - 1;
        const slotIdx = parseInt(parts[4]);

        if (parsedWeeks[weekIdx] && parsedWeeks[weekIdx].materials[slotIdx]) {
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
    console.error("Update Curriculum Error:", error);
    res.status(500).json({ message: "Failed to update curriculum" });
  }
};
