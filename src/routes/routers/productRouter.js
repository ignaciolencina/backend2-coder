import express from 'express';

import { Products } from '../../controllers/products/productsIndex.js';
import { post_productValidationSchema } from '../../helpers/validations/productValidationSchema.js';
import { validateBody } from '../../middlewares/validateBody.js';

export const productRouter = express.Router();

productRouter.post(
  '/',
  (req, res, next) =>
    validateBody(req, res, next, post_productValidationSchema),
  Products.PostController.postProduct,
);

productRouter.get('/', Products.GetController.getProducts);
productRouter.get('/:id', Products.GetController.getProduct);

productRouter.put(
  '/:id',
  (req, res, next) =>
    validateBody(req, res, next, post_productValidationSchema),
  Products.PutController.putProduct,
);

productRouter.delete('/:id', Products.DeleteController.deleteProduct);
