import express from 'express';
import { userRouter } from './routers/userRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/users', userRouter);
