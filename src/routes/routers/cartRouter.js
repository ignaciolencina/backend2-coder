import express from 'express';
import passport from 'passport';

import { Carts } from '../../controllers/carts/cartsIndex.js';
import { requireRole } from '../../middlewares/auth.js';

export const cartRouter = express.Router();

cartRouter.use(passport.authenticate('current', { session: false }));

cartRouter.post('/', requireRole(['user']), Carts.PostController.postCart);

cartRouter.get(
  '/my-carts',
  requireRole(['user']),
  Carts.GetController.getMyCarts,
);

cartRouter.get('/', requireRole(['admin']), Carts.GetController.getCarts);

cartRouter.get(
  '/:id',
  requireRole(['user', 'admin']),
  Carts.GetController.getCart,
);

cartRouter.put(
  '/:cartId/product/:productId',
  requireRole(['user', 'admin']),
  Carts.PutController.addOrUpdateProduct,
);

cartRouter.delete(
  '/:id',
  requireRole(['user', 'admin']),
  Carts.DeleteController.deleteCart,
);

cartRouter.delete(
  '/:cartId/product/:productId',
  requireRole(['user', 'admin']),
  Carts.DeleteController.deleteProduct,
);
