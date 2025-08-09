import HttpCodes from 'http-status-codes';
import { ProductRepository } from '../../../repositories/ProductRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    const updateData = {
      name: body.name,
      description: body.description,
      code: body.code,
      price: body.price,
      stock: body.stock,
      category: body.category,
    };

    try {
      const updatedProduct = await ProductRepository.updateProduct(
        id,
        updateData,
      );

      if (!updatedProduct) {
        return res.status(HttpCodes.NOT_FOUND).json({
          data: null,
          message: 'El producto indicado no fue encontrado',
        });
      }

      return res.status(HttpCodes.OK).json({
        data: updatedProduct,
        message: 'Producto actualizado correctamente',
      });
    } catch (e) {
      return internalError(
        res,
        e,
        'Ocurrió un error al actualizar la informacion del producto',
      );
    }
  }
}
