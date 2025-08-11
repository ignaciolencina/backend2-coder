import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PostController {
  static async postCart(req, res) {
    const { body, user } = req;

    try {
      const cartData = {
        userId: user.id,
        products: body.products || [],
      };

      const newCart = await CartRepository.createCart(cartData);

      return res.status(HttpCodes.CREATED).json({
        data: newCart,
        message: 'Carrito creado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al guardar el carrito');
    }
  }
}
