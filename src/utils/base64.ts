/**
 * Encodes a number into a Base62 string.
 * Uses BigInt to handle large integers safely.
 */
export function encodeBase62(num: number | bigint): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let n = BigInt(num);

  if (n === 0n) return chars[0]!;

  let result = "";
  while (n > 0n) {
    result = chars[Number(n % 62n)] + result;
    n = n / 62n;
  }

  return result;
}

/**
 * Decodes a Base62 string back into a BigInt.
 */
export function decodeBase62(str: string): bigint {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = 0n;

  for (const char of str) {
    const index = chars.indexOf(char);
    if (index === -1) throw new Error(`Invalid character: ${char}`);
    result = result * 62n + BigInt(index);
  }

  return result;
}

import { PoolConnection } from "mysql2/promise.js";
// utils/transaction.ts

import pool from "../database/pool.js";

export async function withTransaction<T>(
  callback: (conn: PoolConnection) => Promise<T>,
): Promise<T> {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const result = await callback(conn);

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
