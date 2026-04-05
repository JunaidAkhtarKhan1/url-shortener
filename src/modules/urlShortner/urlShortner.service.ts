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
      if (id) {
        // Update expiry if already exists
        const result = await urlShortnerRepository.updateUrlExpiry(url, db);
        if (!result) throw new Error("Update expiry failed");
        // Get the short code
        const shortCode = await urlShortnerRepository.checkShortUrl(id, db);
        return `localhost:2000/${shortCode}`;
      } else {
        // Insert if not already exists
        const id = await urlShortnerRepository.insertUrl(url, db);
        // Hash the Url insert key
        const shortCode = encodeBase62(id);

        // update the short_code
        const updated = await urlShortnerRepository.updateShortCode(
          shortCode,
          id,
          db,
        );
        if (!updated) throw new Error("Update short code failed");
        return `localhost:2000/${shortCode}`;
      }
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
