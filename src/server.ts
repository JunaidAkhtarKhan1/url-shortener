import app from "./app.js";
import dotenv from "dotenv";
import { requireEnv } from "./config/env.config.js";
import { initDB } from "./database/index.js";
dotenv.config();

const PORT = requireEnv("PORT");

(async function () {
  // initialize DB
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Cannot Initialize DB and start App", error);
  }
})();
