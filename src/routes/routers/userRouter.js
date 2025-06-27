import express from 'express';

import { Users } from '../../controllers/users/usersIndex.js';
import { post_userValidationSchema } from '../../helpers/validations/userValidationSchema.js';
import { validateBody } from '../../middlewares/validateBody.js';

export const userRouter = express.Router();

userRouter.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userValidationSchema),
  Users.PostController.postUser,
);
