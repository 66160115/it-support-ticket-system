/**
 * คำอธิบาย:
 * ชั้น Service สำหรับจัดการข้อมูลผู้ใช้งาน (User)
 * - สมัครสมาชิก (register)
 * - เข้าสู่ระบบ (login)
 * - ดึงข้อมูลโปรไฟล์ (getProfile)
 *
 * สามารถเชื่อมต่อกับฐานข้อมูลจริงได้ในอนาคต
 * หรือใช้ mock data จำลองเพื่อทดสอบระบบก่อนได้
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ตัวจำลองฐานข้อมูล
let users = [];
let nextUserId = 1;

// สร้าง secret สำหรับ JWT จำลอง (ในโปรดักชันให้ใช้ .env)
const JWT_SECRET = "secret_key_mock";

/**
 * สมัครสมาชิก
 */
export const registerService = async (name, email, password, role = "user") => {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) throw new Error("อีเมลนี้มีอยู่ในระบบแล้ว");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    user_id: nextUserId++,
    name,
    email,
    password: hashedPassword,
    role,
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  return { id: newUser.user_id, name: newUser.name, email: newUser.email, role: newUser.role };
};

/**
 * เข้าสู่ระบบ
 */
export const loginService = async (email, password) => {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("ไม่พบบัญชีผู้ใช้");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("รหัสผ่านไม่ถูกต้อง");

  const token = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: "2h" });

  return {
    token,
    user: { id: user.user_id, name: user.name, email: user.email, role: user.role },
  };
};

/**
 * ดึงข้อมูลโปรไฟล์ผู้ใช้
 */
export const getProfileService = async (userId) => {
  const user = users.find((u) => u.user_id === Number(userId));
  if (!user) throw new Error("ไม่พบผู้ใช้นี้");
  return { id: user.user_id, name: user.name, email: user.email, role: user.role };
};

/**
 * ดึงผู้ใช้ทั้งหมด (เฉพาะ admin)
 */
export const getAllUsersService = async () => {
  return users.map((u) => ({
    id: u.user_id,
    name: u.name,
    email: u.email,
    role: u.role,
  }));
};
