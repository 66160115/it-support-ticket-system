/**
 * คำอธิบาย: จัดการคำสั่ง SQL ที่เกี่ยวข้องกับการสมัครและเข้าสู่ระบบ
 */
import { connectDB } from "../config/db.js";

// ดึงข้อมูลผู้ใช้ตามอีเมล
export const findUserByEmail = async (email) => {
  const db = await connectDB();
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// สร้างผู้ใช้ใหม่
export const createUser = async (name, email, password) => {
  const db = await connectDB();
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId;
};
