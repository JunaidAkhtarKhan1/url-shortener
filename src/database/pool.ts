import mysql, { PoolOptions } from "mysql2/promise";
import dbConfig from "../config/db.config.js";

const config: PoolOptions = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

pool
  .getConnection()
  .then((conn) => {
    console.log("MySQL connected successfully");

    conn.release;
  })
  .catch((err) => {
    console.error("MySQL Connection failed", err.message);
  });

export default pool;
