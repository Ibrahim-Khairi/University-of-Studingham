import LecturePattern from "../models/LecturePattern.js";
import Lecture from "../models/Lecture.js";
import { generateLecturesFromPattern } from "../utils/generateLecturesFromPattern.js";

export const getLecturePatternsByCourse = async (req, res) => {
    try {
        const patterns = await LecturePattern.find({
            courseId: req.params.courseId
        });

        res.json(patterns);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patterns" });
    }
};

export const upsertLecturePatterns = async (req, res) => {
    try {
        const { patterns, academicYearStart } = req.body;
        const { courseId } = req.params;

        if (!Array.isArray(patterns) || patterns.length === 0) {
            return res.status(400).json({ message: "No lecture patterns provided" });
        }
        if (!academicYearStart) {
            return res.status(400).json({ message: "academicYearStart is required" });
        }

        // Remove existing patterns and lectures for this course
        await LecturePattern.deleteMany({ courseId });
        await Lecture.deleteMany({ courseId });

        // Normalize and persist new patterns tied to this course
        const createdPatterns = patterns.map(p => ({ ...p, courseId }));
        let insertedPatterns = [];
        if (createdPatterns.length) {
            insertedPatterns = await LecturePattern.insertMany(createdPatterns);
        }

        // Regenerate lectures from patterns
        const lectures = [];
        for (const pattern of createdPatterns) {
            lectures.push(
                ...generateLecturesFromPattern({
                    courseId,
                    moduleId: pattern.moduleId,
                    tutorId: null,
                    year: pattern.year,
                    weekBlock: pattern.weekBlock,
                    pattern: pattern.pattern,
                    academicYearStart
                })
            );
        }

        let insertedLectures = [];
        if (lectures.length) {
            insertedLectures = await Lecture.insertMany(lectures);
        }

        res.json({
            message: "Lecture & Lecture patterns regenerated",
            patternsInserted: insertedPatterns.length,
            lecturesInserted: insertedLectures.length
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update lecture patterns" });
    }
};