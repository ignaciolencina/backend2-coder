import express from 'express';
import { userRouter } from './routers/userRouter.js';
import { authRouter } from './routers/authRouter.js';
import { productRouter } from './routers/productRouter.js';
import { cartRouter } from './routers/cartRouter.js';
import { ticketRouter } from './routers/ticketRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/products', productRouter);
mainRouter.use('/carts', cartRouter);
mainRouter.use('/tickets', ticketRouter);