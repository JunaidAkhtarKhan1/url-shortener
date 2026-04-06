import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import pool from "../../database/pool.js";
import ApiError from "../../utils/apiError.js";

class UrlShortnerRepository {
  async checkUrlExists(
    originalUrl: string,
    conn?: PoolConnection,
  ): Promise<number | null> {
    const db = conn || pool;
    const [result] = await db.query<RowDataPacket[]>(
      "SELECT id FROM urls WHERE original_url = ?",
      originalUrl,
    );
    return result[0] ? result[0].id : null;
  }
  async checkShortUrl(id: number, conn?: PoolConnection): Promise<string> {
    const db = conn || pool;
    const [result] = await db.query<RowDataPacket[]>(
      "SELECT short_code FROM urls WHERE id = ?",
      id,
    );
    if (result[0] === undefined) throw new ApiError(404, "short url not found");
    return result[0].short_code;
  }

  async updateUrlExpiry(
    originalUrl: string,
    conn?: PoolConnection,
  ): Promise<boolean> {
    const db = conn || pool;
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE urls 
       SET expires_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 MINUTE)
       WHERE original_url = ?`,
      originalUrl,
    );
    return result.affectedRows ? true : false;
  }

  async insertUrl(originalUrl: string, conn?: PoolConnection): Promise<number> {
    const db = conn || pool;
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO urls(original_url, created_at, expires_at)
       VALUES (?, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 MINUTE))`,
      [originalUrl],
    );
    return result.insertId;
  }

  async updateShortCode(
    shortCode: string,
    id: number,
    conn?: PoolConnection,
  ): Promise<boolean> {
    const db = conn || pool;
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE urls SET short_code = ? WHERE id = ?`,
      [shortCode, id],
    );
    return result.affectedRows ? true : false;
  }

  async checkShortUrlWithExpiry(
    code: string,
    conn?: PoolConnection,
  ): Promise<string> {
    const db = conn || pool;
    const [result] = await db.query<RowDataPacket[]>(
      `SELECT original_url FROM urls 
      WHERE short_code = ? AND expires_at > CURRENT_TIMESTAMP`,
      code,
    );
    if (result[0] === undefined) throw new ApiError(404, "Url not found");
    return result[0].original_url;
  }
}

export default new UrlShortnerRepository();
