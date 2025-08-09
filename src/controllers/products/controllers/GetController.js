import HttpCodes from 'http-status-codes';
import { ProductRepository } from '../../../repositories/ProductRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getProducts(_, res) {
    try {
      const products = await ProductRepository.getAllProducts();

      res.status(HttpCodes.OK).json({
        data: products,
        message: 'Productos encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de productos');
    }
  }

  static async getProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const product = await ProductRepository.getProductById(id);

      if (!product) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Producto no encontrado',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: product,
        message: 'Producto encontrado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar el producto');
    }
  }
}
