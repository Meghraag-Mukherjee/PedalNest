import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload; // { userId, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
