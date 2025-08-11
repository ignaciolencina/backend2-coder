import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PutController {
  static async addOrUpdateProduct(req, res) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const { user } = req;

    try {
      if (!quantity || quantity < 1) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          error: 'La cantidad debe ser un número mayor o igual a 1',
        });
      }

      const cart = await CartRepository.getCartById(cartId);

      if (!cart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Carrito no encontrado',
        });
      }

      const cartUserId = cart.userId._id || cart.userId;

      if (user.role !== 'admin' && cartUserId.toString() !== user.id.toString()) {
        return res.status(HttpCodes.FORBIDDEN).json({
          data: null,
          message: 'No tienes permisos para modificar este carrito',
        });
      }

      const updatedCart = await CartRepository.addOrUpdateProduct(
        cartId,
        productId,
        quantity,
      );

      return res.status(HttpCodes.OK).json({
        data: updatedCart,
        message: 'Producto agregado o actualizado correctamente en el carrito',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al modificar el carrito');
    }
  }
}
