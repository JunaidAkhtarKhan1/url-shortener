import app from "./app";
import dotenv from "dotenv";
import { requireEnv } from "./config/env.config";
import { initDB } from "./database";
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
