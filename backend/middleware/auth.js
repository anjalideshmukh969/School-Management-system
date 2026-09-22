import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized, no token provided" });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return res.status(401).json({ message: "User not found or deactivated" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid or expired token" });
  }
};
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Requires one of these roles: ${allowedRoles.join(", ")}` });
  }
  next();
};
