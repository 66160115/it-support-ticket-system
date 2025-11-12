// src/models/ticketModel.js

/**
 * Mock Data จำลองฐานข้อมูล tickets
 */
let tickets = [];
let nextId = 1;

export const getAllTickets = async () => tickets;

export const getTicketById = async (id) =>
  tickets.find((t) => t.ticket_id === Number(id));

export const createTicket = async (title, description, urgency, userId) => {
  const newTicket = {
    ticket_id: nextId++,
    title,
    description,
    urgency,
    status: "open",
    created_at: new Date().toISOString(),
    updated_at: null,
    user_id: userId,
    assigned_to: null,
  };
  tickets.push(newTicket);
  return newTicket.ticket_id;
};

export const updateTicketStatus = async (id, status) => {
  const ticket = tickets.find((t) => t.ticket_id === Number(id));
  if (ticket) {
    ticket.status = status;
    ticket.updated_at = new Date().toISOString();
  }
};

export const assignTicket = async (id, staffId) => {
  const ticket = tickets.find((t) => t.ticket_id === Number(id));
  if (ticket) {
    ticket.assigned_to = staffId;
    ticket.updated_at = new Date().toISOString();
  }
};
