import express from 'express';
import passport from 'passport';

import { Products } from '../../controllers/products/productsIndex.js';
import {
  post_productValidationSchema,
  put_productValidationSchema,
} from '../../helpers/validations/productValidationSchema.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { requireRole } from '../../middlewares/auth.js';

export const productRouter = express.Router();

productRouter.use(passport.authenticate('current', { session: false }));

productRouter.post(
  '/',
  requireRole(['admin']),
  (req, res, next) =>
    validateBody(req, res, next, post_productValidationSchema),
  Products.PostController.postProduct,
);

productRouter.get(
  '/',
  requireRole(['user', 'admin']),
  Products.GetController.getProducts,
);
productRouter.get(
  '/:id',
  requireRole(['user', 'admin']),
  Products.GetController.getProduct,
);

productRouter.put(
  '/:id',
  requireRole(['admin']),
  (req, res, next) => validateBody(req, res, next, put_productValidationSchema),
  Products.PutController.putProduct,
);

productRouter.delete(
  '/:id',
  requireRole(['admin']),
  Products.DeleteController.deleteProduct,
);
