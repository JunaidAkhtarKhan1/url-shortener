import dotenv from "dotenv";
import { requireEnv } from "./env.config.js";
dotenv.config();

export default {
  host: requireEnv("DB_HOST"),
  user: requireEnv("DB_USER"),
  password: requireEnv("DB_PASSWORD"),
  database: requireEnv("DB_NAME"),
  port: Number(process.env.DB_PORT) || 3306,
};
