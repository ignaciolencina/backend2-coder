import { ProductDAO } from '../dao/mongo/ProductDAO.js';
import { ProductDTO } from '../dto/ProductDTO.js';

export class ProductRepository {
  static async getAllProducts() {
    const products = await ProductDAO.findAll();
    return ProductDTO.fromProducts(products);
  }

  static async getProductById(id) {
    const product = await ProductDAO.findById(id);
    return product ? ProductDTO.fromProduct(product) : null;
  }

  static async createProduct(productData) {
    const newProduct = await ProductDAO.create(productData);
    return ProductDTO.fromProduct(newProduct);
  }

  static async updateProduct(id, updateData) {
    const updatedProduct = await ProductDAO.updateById(id, updateData);
    return updatedProduct ? ProductDTO.fromProduct(updatedProduct) : null;
  }

  static async deleteProduct(id) {
    const deletedProduct = await ProductDAO.deleteById(id);
    return deletedProduct ? ProductDTO.fromProduct(deletedProduct) : null;
  }
}
