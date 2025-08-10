import express from 'express';

import { Carts } from '../../controllers/carts/cartsIndex.js';

export const cartRouter = express.Router();

cartRouter.post('/', Carts.PostController.postCart);

cartRouter.get('/', Carts.GetController.getCarts);
cartRouter.get('/:id', Carts.GetController.getCart);

cartRouter.put(
  '/:cartId/product/:productId',
  Carts.PutController.addOrUpdateProduct,
);

cartRouter.delete('/:id', Carts.DeleteController.deleteCart);
cartRouter.delete('/:cartId/product/:productId', Carts.DeleteController.deleteProduct);
