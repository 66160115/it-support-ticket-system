/**
 * คำอธิบาย: เส้นทาง API สำหรับ Ticket Management
 */
import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateStatus,
  assignTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTickets);           // ดึง ticket ทั้งหมด
router.get("/:id", getTicketById);        // ดึง ticket รายการเดียว
router.post("/", createTicket);           // สร้าง ticket ใหม่
router.patch("/:id/status", updateStatus); // อัปเดตสถานะ ticket
router.patch("/:id/assign", assignTicket); // มอบหมายให้ staff

export default router;
