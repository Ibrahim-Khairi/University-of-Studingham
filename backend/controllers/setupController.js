import Course from "../models/Course.js";
import Module from "../models/Module.js";

export const createCourse = async (req, res) => {
    const { name, code, aboutTheCourse, courseStructure, assessments } = req.body;

    const course = await Course.create({
        name, code, aboutTheCourse, courseStructure, assessments
    });

    res.status(201).json(course);
};

export const createModule = async (req, res) => {
    const { name, courseId, year, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(400).json({ message: "Invalid course selected" });

    const module = await Module.create({
        name, courseId, year, description
    });

    res.status(201).json(module);
};

export const getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

export const getModulesByCourse= async (req, res) => {
    const { courseId } = req.params;

    const modules = await Module.find({ courseId });
    res.json(modules);
};