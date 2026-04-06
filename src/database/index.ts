import pool from "./pool.js";

export async function initDB(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("MySQL ping successfully");
  } catch (error) {
    console.error("MySQL ping failed");
    throw error;
  }
}
