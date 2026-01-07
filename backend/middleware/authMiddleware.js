import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
<<<<<<< HEAD
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check if token is literal string "null" or "undefined"
  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({ message: "Malformed token" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid" });
    }
    req.user = payload;
    next();
  });
};
=======
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ msg: "Access token missing" });

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ msg: "Invalid or expire token" });
        }

        req.user = payload;
        console.log("Auth User:", req.user);
        next();
    });
};
>>>>>>> ccc4e0b3ad743e638bdea713ed668718b135df5a
