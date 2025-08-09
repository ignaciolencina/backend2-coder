import HttpCodes from 'http-status-codes';
import { ProductRepository } from '../../../repositories/ProductRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    const productData = {
      name: body.name,
      description: body.description,
      code: body.code,
      price: body.price,
      stock: body.stock,
      category: body.category,
    };

    try {
      await ProductRepository.createProduct(productData);

      return res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Producto creado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al guardar el producto');
    }
  }
}
