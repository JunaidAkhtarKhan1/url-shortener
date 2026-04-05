import app from "./app";
import dotenv from "dotenv";
import { requireEnv } from "./config/env.config";
dotenv.config();

const PORT = requireEnv("PORT");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
