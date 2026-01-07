import Tutor from "../models/Tutor.js";

export const getMyModules = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ userId: req.user.userId }).populate(
      "modules"
    );

    if (!tutor) {
      return res.status(404).json({ message: "Tutor profile not found" });
    }

    // Return both the registered year and the modules
    res.json({
      registeredYear: tutor.year, // This is the 1, 2, or 3 from registration
      modules: tutor.modules,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
