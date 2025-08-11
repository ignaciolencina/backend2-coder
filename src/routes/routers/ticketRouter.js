import express from 'express';
import passport from 'passport';

import { Tickets } from '../../controllers/tickets/ticketsIndex.js';
import { requireRole } from '../../middlewares/auth.js';

export const ticketRouter = express.Router();

ticketRouter.use(passport.authenticate('current', { session: false }));

ticketRouter.get(
  '/my-tickets',
  requireRole(['user']),
  Tickets.GetController.getMyTickets,
);

ticketRouter.get(
  '/',
  requireRole(['admin']),
  Tickets.GetController.getTickets,
);

ticketRouter.get(
  '/:id',
  requireRole(['user', 'admin']),
  Tickets.GetController.getTicket,
);