import HttpCodes from 'http-status-codes';
import { CartRepository } from '../../../repositories/CartRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PutController {
  static async addOrUpdateProduct(req, res) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
      if (!quantity || quantity < 1) {
        return res.status(HttpCodes.BAD_REQUEST).json({
          error: 'La cantidad debe ser un número mayor o igual a 1',
        });
      }

      const updatedCart = await CartRepository.addOrUpdateProduct(
        cartId,
        productId,
        quantity,
      );

      if (!updatedCart) {
        return res.status(HttpCodes.NOT_FOUND).json({
          message: 'Carrito no encontrado',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: updatedCart,
        message: 'Producto agregado o actualizado correctamente en el carrito',
      });
    } catch (e) {
      return internalError(res, e, 'Ocurrió un error al modificar el carrito');
    }
  }
}
