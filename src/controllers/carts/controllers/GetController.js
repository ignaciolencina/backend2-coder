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
      } = req;
  
      try {
        const cart = await CartRepository.getCartById(id);
  
        if (!cart) {
          return res.status(HttpCodes.NOT_FOUND).json({
            data: null,
            message: 'Carrito no encontrado',
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
  }