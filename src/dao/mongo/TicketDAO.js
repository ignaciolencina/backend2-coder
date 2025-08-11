import TicketModel from '../../models/ticketSchema.js';

export class TicketDAO {
  static async findAll() {
    return TicketModel.find();
  }

  static async findById(id) {
    return TicketModel.findById(id);
  }

  static async create(ticketData) {
    const newTicket = new TicketModel(ticketData);
    return newTicket.save();
  }

  static async findByPurchaser(purchaser) {
    return TicketModel.find({ purchaser });
  }

  static async deleteById(id) {
    return TicketModel.findByIdAndDelete(id);
  }
}