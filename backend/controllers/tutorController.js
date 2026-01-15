import Tutor from "../models/Tutor.js";
import Module from "../models/Module.js";

export const getMyModules = async (req, res) => {
  try {
    // 1. Find the tutor profile
    const tutor = await Tutor.findOne({ userId: req.user.userId });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor profile not found" });
    }

    // 2. Find all modules where this tutor is assigned
    // We check the 'modules' array from the tutor AND modules that point to this tutor
    const modules = await Module.find({
      $or: [{ _id: { $in: tutor.modules } }, { tutorId: tutor._id }],
    });

    res.json({
      registeredYear: tutor.year,
      modules: modules,
    });
  } catch (error) {
    console.error("getMyModules Error:", error);
    res.status(500).json({ message: "Server error fetching modules" });
  }
};
