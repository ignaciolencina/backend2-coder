import HttpCodes from 'http-status-codes';
import { ProductRepository } from '../../../repositories/ProductRepository.js';
import { internalError } from '../../../helpers/helpers.js';

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    const updateData = {};
    
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.code !== undefined) updateData.code = body.code;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.stock !== undefined) updateData.stock = body.stock;
    if (body.category !== undefined) updateData.category = body.category;

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
