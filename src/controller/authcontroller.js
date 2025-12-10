import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";
import { env } from "../config/env.js";

const buildToken = user =>
  jwt.sign(
    { userId: user.id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) {
    return res.status(409).json({ message: "Email already registered" });
    }

   const existsPhone = await User.findOne({ where: { phone } });
   if (existsPhone) {
    return res.status(409).json({ message: "Phone already registered" });
     }
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password_hash: hash,
      role: "CUSTOMER"
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = buildToken(user);

    return res.json({
      accessToken: token,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
