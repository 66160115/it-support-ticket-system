/**
 * คำอธิบาย: จัดการตรรกะธุรกิจ (Business Logic) สำหรับ Auth
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/authModel.js";

export const registerService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("อีเมลนี้ถูกใช้ไปแล้ว");

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createUser(name, email, hashed);

  return { id: userId, name, email };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("ไม่พบผู้ใช้ในระบบ");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("รหัสผ่านไม่ถูกต้อง");

  const token = jwt.sign(
    { id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};
