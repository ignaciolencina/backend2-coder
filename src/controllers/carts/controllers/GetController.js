import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class GetController {
  static async getCarts(_, res) {
    try {
      const carts = await CartRepository.getAllCarts();

      res.status(HttpCodes.OK).json({
        data: carts,
        message: 'Carritos encontrados correctamente',
      });
    } catch (e) {
      internalError(res, e, 'Ocurrió un error al leer la lista de carritos');
    }
  }

  static async getCart(req, res) {
    const {
      params: { id },
      user,
    } = req;

    try {
      const cart = await CartRepository.getCartById(id);

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
          message: 'No tienes permisos para acceder a este carrito',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: cart,
        message: 'Carrito encontrado correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar el carrito');
    }
  }

  static async getMyCarts(req, res) {
    const { user } = req;

    try {
      const carts = await CartRepository.getCartsByUserId(user.id);

      return res.status(HttpCodes.OK).json({
        data: carts,
        message: 'Tus carritos fueron encontrados correctamente',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al buscar tus carritos');
    }
  }
}
