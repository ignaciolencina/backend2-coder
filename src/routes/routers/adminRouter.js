import express from 'express';
import passport from 'passport';

import { Admin } from '../../controllers/admin/adminIndex.js';
import { requireRole } from '../../middlewares/auth.js';

export const adminRouter = express.Router();

adminRouter.use(passport.authenticate('current', { session: false }));

adminRouter.get(
  '/panel',
  requireRole(['admin']),
  Admin.GetController.getAdminPanel,
);
