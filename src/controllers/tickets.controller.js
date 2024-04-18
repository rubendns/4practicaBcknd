import TicketDao from "../dao/ticket.dao.js";
const ticketDao = new TicketDao();

export const createTicket = async (req, res) => {
  console.log("Creating ticket");
  const newTicket = { amount: req.amount, purchaser: req.purchaser };
  try {
    const ticket = await ticketDao.createTicket(newTicket);
    res.json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ success: false, error: "Error al crear el ticket" });
  }
};