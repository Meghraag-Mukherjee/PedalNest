import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import { sequelize } from "./config/db.js";
import "./models/usermodel.js"; // ensure User model is registered

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// DB connect + sync
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync(); // or sequelize.sync({ alter: true }) in dev
    console.log("DB synced");
  } catch (err) {
    console.error("DB error:", err);
  }
};

initDb();

export default app;
