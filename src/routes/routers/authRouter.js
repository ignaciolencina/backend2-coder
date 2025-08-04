import express from 'express';

import { Auth } from '../../controllers/auth/authIndex.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { post_loginValidationSchema } from '../../helpers/validations/authValidationSchema.js';

export const authRouter = express.Router();

authRouter.post(
  '/login',
  (req, res, next) => validateBody(req, res, next, post_loginValidationSchema),
  Auth.PostController.postLogin,
);

authRouter.get('/current', Auth.GetController.current);

authRouter.post('/logout', Auth.PostController.postLogout);
