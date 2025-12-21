import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: "Access token missing" });

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            res.status(403).json({ msg: "Invalid or expire token" });
            console.log(err);
        };

        console.log("Auth User:", req.user);
        req.user = payload;
        next();
    });
};