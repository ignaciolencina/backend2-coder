import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class DeleteController {
  static async deleteCart(req, res) {
    const {
      params: { id },
      user,
    } = req;

    try {
      const cart = await CartRepository.getCartById(id);

      if (!cart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El carrito indicado no fue encontrado',
        });
      }

      const cartUserId = cart.userId._id || cart.userId;

      if (
        user.role !== 'admin' &&
        cartUserId.toString() !== user.id.toString()
      ) {
        return res.status(HttpCodes.FORBIDDEN).json({
          data: null,
          message: 'No tienes permisos para eliminar este carrito',
        });
      }

      await CartRepository.deleteCart(id);

      res.status(HttpCodes.OK).json({
        data: null,
        message: 'Carrito eliminado correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al intentar eliminar el carrito');
    }
  }

  static async deleteProduct(req, res) {
    const { cartId, productId } = req.params;
    const { user } = req;

    try {
      const cart = await CartRepository.getCartById(cartId);

      if (!cart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El carrito no fue encontrado',
        });
      }

      const cartUserId = cart.userId._id || cart.userId;

      if (
        user.role !== 'admin' &&
        cartUserId.toString() !== user.id.toString()
      ) {
        return res.status(HttpCodes.FORBIDDEN).json({
          data: null,
          message: 'No tienes permisos para modificar este carrito',
        });
      }

      const updatedCart = await CartRepository.deleteProductFromCart(
        cartId,
        productId,
      );

      if (!updatedCart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El producto no fue encontrado en el carrito',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: updatedCart,
        message: 'Producto eliminado correctamente del carrito',
      });
    } catch (e) {
      return internalError(
        res,
        e,
        'Ocurrió un error al eliminar el producto del carrito',
      );
    }
  }
}
