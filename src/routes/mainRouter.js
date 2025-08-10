import express from 'express';
import { userRouter } from './routers/userRouter.js';
import { authRouter } from './routers/authRouter.js';
import { adminRouter } from './routers/adminRouter.js';
import { productRouter } from './routers/productRouter.js';
import { cartRouter } from './routers/cartRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/products', productRouter);
mainRouter.use('/carts', cartRouter);
