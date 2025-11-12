/**
 * คำอธิบาย: ชั้น logic สำหรับการจัดการ ticket
 */
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  assignTicket,
} from "../models/ticketModel.js";

export const listTicketsService = async () => {
  return await getAllTickets();
};

export const getTicketDetailService = async (ticketId) => {
  const ticket = await getTicketById(ticketId);
  if (!ticket) throw new Error("ไม่พบ ticket นี้");
  return ticket;
};

export const createTicketService = async (title, description, urgency, userId) => {
  const newTicketId = await createTicket(title, description, urgency, userId);
  const ticket = await getTicketById(newTicketId);
  return ticket;
};

export const changeStatusService = async (ticketId, status) => {
  await updateTicketStatus(ticketId, status);
  return await getTicketById(ticketId);
};

export const assignTicketService = async (ticketId, staffId) => {
  await assignTicket(ticketId, staffId);
  return await getTicketById(ticketId);
};
