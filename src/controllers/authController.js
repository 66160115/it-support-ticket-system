/**
 * คำอธิบาย: รับ request และส่ง response สำหรับ auth
 */
import { registerService, loginService } from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return errorResponse(res, "กรุณากรอกข้อมูลให้ครบถ้วน", 400);

    const result = await registerService(name, email, password);
    successResponse(res, "สมัครสมาชิกสำเร็จ", result);
  } catch (err) {
    errorResponse(res, err.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, "กรุณากรอกข้อมูลให้ครบถ้วน", 400);

    const result = await loginService(email, password);
    successResponse(res, "เข้าสู่ระบบสำเร็จ", result);
  } catch (err) {
    errorResponse(res, err.message, 401);
  }
};
