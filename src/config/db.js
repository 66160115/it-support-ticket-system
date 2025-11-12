import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Database connected successfully");
    return db;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};
