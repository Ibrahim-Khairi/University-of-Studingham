export const replaceCourseModules = async (req, res) => {
    const { courseId } = req.params;
    const { modules } = req.body;

    if (!modules) return res.status(400).json({ message: "Modules data required" });

    try {
        await Module.deleteMany({ courseId });

        let incoming = [];

        if (Array.isArray(modules)) {
            incoming = modules;
        } else if (typeof modules === "object" && modules !== null) {
            Object.entries(modules).forEach(([yearKey, moduleList]) => {
                const year = Number(String(yearKey).replace("year", ""));
                if (Array.isArray(moduleList)) {
                    moduleList.forEach(m => incoming.push({ ...m, year }));
                }
            });
        }

        const formattedModules = [];
        const yearCounters = { 1: 0, 2: 0, 3: 0 };

        for (const module of incoming) {
            const name = module?.name?.trim?.();
            const description = module?.description?.trim?.();
            const year = Number(module?.year);

            if (!name || !description || ![1, 2, 3].includes(year)) continue;

            const idx = yearCounters[year];
            const startWeek = idx * 8 + 1;
            const endWeek = idx * 8 + 8;
            yearCounters[year]++;

            formattedModules.push({
                name,
                description,
                year,
                courseId,
                tutorId: null,
                startWeek,
                endWeek
            });
        }

        let inserted = [];
        if (formattedModules.length > 0) {
            inserted = await Module.insertMany(formattedModules);
        }

        res.status(200).json(inserted);
    } catch (error) {
        res.status(500).json({ message: "Failed to replace modules" });
    }
};