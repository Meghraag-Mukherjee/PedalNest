import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize(env.dbUrl, {
  dialect: "mysql",
  logging: false
});
