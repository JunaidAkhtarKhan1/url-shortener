import { requireEnv } from "../../config/env.config.js";
import pool from "../../database/pool.js";
import ApiError from "../../utils/apiError.js";
import { encodeBase62, withTransaction } from "../../utils/base64.js";
import urlShortnerRepository from "./urlShortner.repository.js";

class UrlShortnerService {
  async createShortUrl(url: string): Promise<string> {
    if (!url) throw new ApiError(400, "Url is required");
    return await withTransaction(async (db) => {
      // Take the Url from input
      const id = await urlShortnerRepository.checkUrlExists(url, db);
      let shortCode: string;

      if (id) {
        // Update expiry if already exists
        const result = await urlShortnerRepository.updateUrlExpiry(url, db);
        if (!result) throw new ApiError(500, "Update expiry failed");
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
        if (!updated) throw new ApiError(500, "Update short url failed");
      }
      return `${requireEnv("BASE_URL")}/${shortCode}`;
    });
  }
  async readShortUrl(code: string | undefined): Promise<string> {
    // Check if short_code exists in DB and not expired yet
    if (!code) throw new ApiError(400, "url param is not defined");
    return await urlShortnerRepository.checkShortUrlWithExpiry(code);
  }
}

export default new UrlShortnerService();
