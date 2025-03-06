import mysql from "mysql2/promise";
import { dbConfig } from "./database";

// Create a connection pool for better performance
export const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful!");
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
