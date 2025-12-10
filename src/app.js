import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import { sequelize } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// sync DB in dev (for production use migrations)
sequelize.authenticate().then(() => {
  console.log("DB connected");
});

export default app;
