import { requireEnv } from "../../config/env.config";
import pool from "../../database/pool";
import { encodeBase62 } from "../../utils/base64";
import urlShortnerRepository from "./urlShortner.repository";

class UrlShortnerService {
  async createShortUrl(url: string): Promise<string> {
    if (!url) throw new Error("Url is required");
    const db = await pool.getConnection();
    try {
      // Initiate Transaction
      await db.beginTransaction();
      // Take the Url from input
      const id = await urlShortnerRepository.checkUrlExists(url, db);
      let shortCode: string;

      if (id) {
        // Update expiry if already exists
        const result = await urlShortnerRepository.updateUrlExpiry(url, db);
        if (!result) throw new Error("Update expiry failed");
        // Get the short code
        shortCode = await urlShortnerRepository.checkShortUrl(id, db);
      } else {
        // Insert if not already exists
        const newId = await urlShortnerRepository.insertUrl(url, db);
        // Hash the Url insert key
        shortCode = encodeBase62(newId);

        // update the short_code
        const updated = await urlShortnerRepository.updateShortCode(
          shortCode,
          newId,
          db,
        );
        if (!updated) throw new Error("Update short code failed");
      }

      await db.commit();
      return `${requireEnv("BASE_URL")}/${shortCode}`;
    } catch (error) {
      console.error("DB call failed", error);
      await db.rollback();
      throw new Error("DB call failed");
    } finally {
      db.release();
    }
  }
  async readShortUrl() {
    console.log("get URL");
    console.log(encodeBase62(0));
    return true;
  }
}

export default new UrlShortnerService();
