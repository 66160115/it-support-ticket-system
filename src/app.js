import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { requestLogger, info } from "./utils/logger.js"; // ✅ เพิ่มตรงนี้
import { errorHandler } from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger); // ✅ ตรงนี้คือจุดที่ใช้ logger ทุก request

// เชื่อมต่อฐานข้อมูล (ตอนนี้ยัง mock ได้)
connectDB();

// routes หลัก
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

// route ทดสอบ
app.get("/", (req, res) => {
  info("มีการเรียกหน้าแรก /"); // ✅ log ลงไฟล์และแสดงใน console
  res.send("Welcome to IT Support Ticket System API!");
});

// Middleware จัดการ error
app.use(errorHandler);

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => info(`🚀 Server started on port ${PORT}`));
