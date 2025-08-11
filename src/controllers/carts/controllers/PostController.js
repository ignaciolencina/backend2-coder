import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { PurchaseService } from '../../../services/PurchaseService.js';
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

  static async purchaseCart(req, res) {
    const { cartId } = req.params;
    const { user } = req;

    try {
      const cart = await CartRepository.getCartById(cartId);

      if (!cart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'Carrito no encontrado',
        });
      }

      const cartUserId = cart.userId._id || cart.userId;

      if (
        user.role !== 'admin' &&
        cartUserId.toString() !== user.id.toString()
      ) {
        return res.status(HttpCodes.FORBIDDEN).json({
          data: null,
          message: 'No tienes permisos para realizar la compra de este carrito',
        });
      }

      const purchaseResult = await PurchaseService.processPurchase(
        cartId,
        user.email,
      );

      if (
        !purchaseResult.ticket &&
        purchaseResult.failedProductIds.length > 0
      ) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          data: {
            failedProductIds: purchaseResult.failedProductIds,
          },
          message:
            'No se pudo completar la compra. Todos los productos tienen stock insuficiente.',
        });
      }

      const response = {
        data: {
          ticket: purchaseResult.ticket,
          purchasedProducts: purchaseResult.purchasedProducts,
          failedProductIds: purchaseResult.failedProductIds,
        },
        message:
          purchaseResult.failedProductIds.length > 0
            ? 'Compra completada parcialmente. Algunos productos no pudieron comprarse por falta de stock.'
            : 'Compra completada exitosamente',
      };

      return res.status(HttpCodes.OK).json(response);
    } catch (error) {
      return internalError(
        res,
        error,
        'Error al procesar la compra del carrito',
      );
    }
  }
}
