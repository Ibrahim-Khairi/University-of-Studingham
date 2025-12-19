import User from "../models/User.js"

export const statusMiddleware = (allowedStatuses) => {
    return async (req, res, next) => {
        if (!req.user || !req.user.userId) return res.status(401).json({ message: "Not authenticated" });

        const user = await User.findById(req.user.userId);

        if (!user) return res.status(401).json({ message: "User not found" });

        if (!allowedStatuses.includes(user.status)) return res.status(401).json({ message: `Account ${user.status}` });

        console.log("Status Check: ", user.status);
        next();
    };
};