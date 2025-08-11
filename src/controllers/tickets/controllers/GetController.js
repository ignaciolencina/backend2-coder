import HttpCodes from 'http-status-codes';
import { TicketRepository } from '../../../repositories/TicketRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getTickets(req, res) {
    const { user } = req;

    try {
      let tickets;

      if (user.role === 'admin') {
        tickets = await TicketRepository.getAllTickets();
      } else {
        tickets = await TicketRepository.getTicketsByPurchaser(user.email);
      }

      res.status(HttpCodes.OK).json({
        data: tickets,
        message: 'Tickets encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de tickets');
    }
  }

  static async getTicket(req, res) {
    const { id } = req.params;
    const { user } = req;

    try {
      const ticket = await TicketRepository.getTicketById(id);

      if (!ticket) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Ticket no encontrado',
        });
      }

      if (user.role !== 'admin' && ticket.purchaser !== user.email) {
        return res.status(HttpCodes.FORBIDDEN).json({
          data: null,
          message: 'No tienes permisos para acceder a este ticket',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: ticket,
        message: 'Ticket encontrado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar el ticket');
    }
  }

  static async getMyTickets(req, res) {
    const { user } = req;

    try {
      const tickets = await TicketRepository.getTicketsByPurchaser(user.email);

      return res.status(HttpCodes.OK).json({
        data: tickets,
        message: 'Tus tickets fueron encontrados correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar tus tickets');
    }
  }
}