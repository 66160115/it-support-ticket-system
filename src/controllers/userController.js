import { successResponse } from "../utils/response.js";

const mockUsers = [
  { id: 1, name: "Admin", email: "admin@example.com" },
  { id: 2, name: "User1", email: "user1@example.com" },
];

export const getAllUsers = (req, res) => {
  successResponse(res, "ดึงข้อมูลผู้ใช้สำเร็จ", mockUsers);
};
