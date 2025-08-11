export class TicketDTO {
    constructor(ticket) {
      this.id = ticket._id || ticket.id;
      this.purchase_datetime = ticket.purchase_datetime;
      this.amount = ticket.amount;
      this.purchaser = ticket.purchaser;
      this.createdAt = ticket.createdAt;
      this.updatedAt = ticket.updatedAt;
    }
  
    static fromTicket(ticket) {
      return new TicketDTO(ticket);
    }
  
    static fromTickets(tickets) {
      return tickets.map((ticket) => new TicketDTO(ticket));
    }
  }