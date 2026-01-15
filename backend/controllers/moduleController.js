import Module from "../models/Module.js";
import QuizSubmission from "../models/QuizSubmission.js";

export const submitQuiz = async (req, res) => {
  try {
    const { moduleId, weekNumber, answers } = req.body;
    const studentId = req.user.userId;

    const module = await Module.findById(moduleId);
    const week = module.weeks.find((w) => w.weekNumber === weekNumber);

    if (!week || !week.quiz || !week.quiz.questions.length) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate Score
    let correctCount = 0;
    week.quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) correctCount++;
    });

    const submission = await QuizSubmission.create({
      studentId,
      moduleId,
      weekNumber,
      score: correctCount,
      totalQuestions: week.quiz.questions.length,
    });

    res.json({
      message: "Success",
      score: correctCount,
      total: week.quiz.questions.length,
    });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(400)
        .json({ message: "You have already completed this assessment." });
    res.status(500).json({ message: "Submission failed" });
  }
};

export const getMyScores = async (req, res) => {
  try {
    const scores = await QuizSubmission.find({
      studentId: req.user.userId,
      moduleId: req.params.moduleId,
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scores" });
  }
};

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
export const getAllMyScores = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // Find all submissions for this student
    // We "populate" moduleId to get the name and year of the module
    const submissions = await QuizSubmission.find({ studentId })
      .populate("moduleId", "name year")
      .sort({ createdAt: -1 }); // Newest first

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching all scores:", error);
    res.status(500).json({ message: "Failed to retrieve academic records" });
  }
};
