import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

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

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};
