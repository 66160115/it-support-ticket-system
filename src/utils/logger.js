/**
 * คำอธิบาย:
 * Utility สำหรับจัดการ log ในระบบ
 * - log ข้อความทั่วไป (info)
 * - log ข้อความเตือน (warn)
 * - log ข้อผิดพลาด (error)
 * - log สำหรับการร้องขอ API (request logger)
 */

import fs from "fs";
import path from "path";

// สร้างโฟลเดอร์ logs ถ้ายังไม่มี
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// helper ฟังก์ชันสำหรับเขียน log ลงไฟล์
const writeLog = (level, message) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(path.join(logDir, "app.log"), logLine);
  console.log(logLine.trim()); // แสดงใน console ด้วย
};

/**
 * Log ระดับข้อมูลทั่วไป เช่น “Server started” หรือ “User created”
 */
export const info = (message) => writeLog("info", message);

/**
 * Log ระดับเตือน เช่น “Unauthorized access attempt” หรือ “High load”
 */
export const warn = (message) => writeLog("warn", message);

/**
 * Log ระดับ error เช่น “Database connection failed”
 */
export const error = (message) => writeLog("error", message);

/**
 * Middleware สำหรับ express:
 * ใช้ log ทุก request ที่เข้ามา
 */
export const requestLogger = (req, res, next) => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMsg = `${method} ${url} ${res.statusCode} - ${duration}ms`;
    writeLog("request", logMsg);
  });

  next();
};
