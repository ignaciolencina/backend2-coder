import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postCart(req, res) {
    const { body } = req;

    const cartData = {
      products: body.products,
    };

    try {
      await CartRepository.createCart(cartData);

      return res.status(HttpCodes.CREATED).json({
        data: null,
        message: 'Carrito creado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al guardar el carrito');
    }
  }
}
