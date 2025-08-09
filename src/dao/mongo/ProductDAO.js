import ProductModel from '../../models/productsSchema.js';

export class ProductDAO {
  static async findAll() {
    return ProductModel.find();
  }

  static async findById(id) {
    return ProductModel.findById(id);
  }

  static async create(productData) {
    const newProduct = new ProductModel(productData);
    return newProduct.save();
  }

  static async updateById(id, updateData) {
    return ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteById(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
