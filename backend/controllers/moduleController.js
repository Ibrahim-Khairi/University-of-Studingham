import Module from "../models/Module.js";

// export const createModules = async (req, res) => {
//     try {
//         const { modules, courseId } = req.body;
//
//         if (!courseId || !modules) return res.status(400).json({ message: "Missing data" });
//
//         const formattedModules = [];
//
//
//         Object.entries(modules).forEach(([yearKey, moduleList]) => {
//             const year = Number(yearKey.replace("year", ""));
//
//             moduleList.forEach((module) => {
//                 if (module.name && module.description) {
//                     formattedModules.push({
//                         name: module.name,
//                         description: module.description,
//                         year,
//                         courseId
//                     });
//                 }
//             });
//         });
//
//         const createdModules = await Module.insertMany(formattedModules);
//
//         res.status(201).json(createdModules)
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getModulesByCourse= async (req, res) => {
    const { courseId } = req.params;

    const modules = await Module.find({ courseId });
    res.json(modules);
};

// export const deleteModulesByCourse = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//
//         await Module.deleteMany({ courseId });
//
//         res.status(200).json({ message: "Modules deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete modules" });
//     }
// }

// export const createModulesByBulk = async (req, res) => {
//     try {
//         const { courseId, modules } = req.body;
//
//         const formattedModules = [];
//
//         Object.entries(modules).forEach(([yearKey, moduleList]) => {
//             const year = Number(yearKey.replace("year", ""));
//
//             moduleList.forEach((module) => {
//                 if (module.name && module.description) {
//                     formattedModules.push({
//                         name: module.name,
//                         description: module.description,
//                         year,
//                         courseId,
//                         tutorId: null
//                     });
//                 }
//             });
//         });
//
//         await Module.insertMany(formattedModules);
//
//         res.status(201).json({ message: "Modules created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to create modules" });
//     }
// }