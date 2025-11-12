/**
 * คำอธิบาย: รับ request และตอบ response สำหรับ Ticket API
 */
import {
  listTicketsService,
  getTicketDetailService,
  createTicketService,
  changeStatusService,
  assignTicketService,
} from "../services/ticketService.js";
import { successResponse, errorResponse } from "../utils/response.js";

// ดึง ticket ทั้งหมด
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await listTicketsService();
    successResponse(res, "ดึงข้อมูล ticket สำเร็จ", tickets);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// ดึง ticket รายละเอียดเดียว
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await getTicketDetailService(id);
    successResponse(res, "ดึงข้อมูล ticket สำเร็จ", ticket);
  } catch (err) {
    errorResponse(res, err.message, 404);
  }
};

// สร้าง ticket ใหม่
export const createTicket = async (req, res) => {
  try {
    const { title, description, urgency } = req.body;
    const userId = req.user?.id || 1; // จำลอง user_id (ถ้ายังไม่มี auth)
    if (!title || !description || !urgency)
      return errorResponse(res, "กรุณากรอกข้อมูลให้ครบถ้วน", 400);

    const ticket = await createTicketService(title, description, urgency, userId);
    successResponse(res, "สร้าง ticket สำเร็จ", ticket);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// อัปเดตสถานะ ticket
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await changeStatusService(id, status);
    successResponse(res, "อัปเดตสถานะสำเร็จ", updated);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

// มอบหมาย ticket ให้ staff
export const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffId } = req.body;
    const updated = await assignTicketService(id, staffId);
    successResponse(res, "มอบหมาย ticket สำเร็จ", updated);
  } catch (err) {
    errorResponse(res, err.message);
  }
};
