import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class DeleteController {
  static async deleteCart(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const deletedCart = await CartRepository.deleteCart(id);

      if (!deletedCart) {
        res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El carrito indicado no fue encontrado',
        });
        return;
      }

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

    try {
      const updatedCart = await CartRepository.deleteProductFromCart(
        cartId,
        productId,
      );

      if (!updatedCart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El carrito o el producto no fueron encontrados',
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
