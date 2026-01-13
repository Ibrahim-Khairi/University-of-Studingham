import Course from "../models/Course.js";
import Module from "../models/Module.js";

export const createCourse = async (req, res) => {
  const { name, code, aboutTheCourse, courseStructure, assessments } = req.body;

  const course = await Course.create({
    name,
    code,
    aboutTheCourse,
    courseStructure,
    assessments,
  });

  res.status(201).json(course);
};

export const createModule = async (req, res) => {
  const { name, courseId, year, description } = req.body;

  const course = await Course.findById(courseId);
  if (!course)
    return res.status(400).json({ message: "Invalid course selected" });

  const module = await Module.create({
    name,
    courseId,
    year,
    description,
  });

  res.status(201).json(module);
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

export const getModulesByCourseByYear = async (req, res) => {
  try {
    const { courseId, year } = req.params;

    // 1. Check if the courseId and year are valid
    if (!courseId || isNaN(Number(year))) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    // 2. Query: We want modules for this course AND this year AND marked as published
    const modules = await Module.find({
      courseId: courseId,
      year: Number(year),
      isVisible: true, // This is why you must click 'Publish' in Admin
    });

    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
