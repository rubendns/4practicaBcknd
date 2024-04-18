export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllTickets = () => {
    return this.dao.getAllTickets();
  }  

  getTicketById = (id) => {
    return this.dao.getTicketById(id);
  }

  createTicket = (ticket) => {
    return this.dao.createTicket(ticket);
  }

}