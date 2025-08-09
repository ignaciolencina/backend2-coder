import HttpCodes from 'http-status-codes';
import { ProductRepository } from '../../../repositories/ProductRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class DeleteController {
  static async deleteProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const deletedProduct = await ProductRepository.deleteProduct(id);

      if (!deletedProduct) {
        res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El producto indicado no fue encontrado',
        });
        return;
      }

      res.status(HttpCodes.OK).json({
        data: null,
        message: 'Producto eliminado correctamente',
      });
    } catch (e) {
      internalError(
        res,
        e,
        'Ocurrió un error al intentar eliminar el producto',
      );
    }
  }
}
