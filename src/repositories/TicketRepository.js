import { TicketDAO } from '../dao/mongo/TicketDAO.js';
import { TicketDTO } from '../dto/TicketDTO.js';

export class TicketRepository {
  static async getAllTickets() {
    const tickets = await TicketDAO.findAll();
    return TicketDTO.fromTickets(tickets);
  }

  static async getTicketById(id) {
    const ticket = await TicketDAO.findById(id);
    return ticket ? TicketDTO.fromTicket(ticket) : null;
  }

  static async createTicket(ticketData) {
    const newTicket = await TicketDAO.create(ticketData);
    return TicketDTO.fromTicket(newTicket);
  }

  static async getTicketsByPurchaser(purchaser) {
    const tickets = await TicketDAO.findByPurchaser(purchaser);
    return TicketDTO.fromTickets(tickets);
  }

  static async deleteTicket(id) {
    const deletedTicket = await TicketDAO.deleteById(id);
    return deletedTicket ? TicketDTO.fromTicket(deletedTicket) : null;
  }
}