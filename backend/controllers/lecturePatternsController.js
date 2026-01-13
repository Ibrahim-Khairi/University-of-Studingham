import LecturePattern from "../models/LecturePattern.js";
import Lecture from "../models/Lecture.js";

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
        const { patterns } = req.body;
        const { courseId } = req.params;

        await LecturePattern.deleteMany({ courseId });

        const createdPatterns = patterns.map(pattern => ({
            ...pattern,
            courseId
        }));

        await Lecture.deleteMany({ courseId });

        const lectures = [];
        
        for (const pattern of createdPatterns) {
            lectures.push(
                ...generateLecturesFromPattern({
                    courseId,
                    moduleId: pattern.moduleId,
                    tutorId: null,
                    year: pattern.year,
                    weekBlock: pattern.weekBlock,
                    pattern: pattern.pattern
                })
            );
        }

        if (lectures.length) await Lecture.insertMany(lectures);

        res.json({ message: "Lecture & Lecture patterns regenerated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update lecture patterns" });
    }
}