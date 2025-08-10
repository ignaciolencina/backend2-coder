import CartModel from '../../models/cartSchema.js';

export class CartDAO {
  static async findAll() {
    return CartModel.find();
  }

  static async findById(id) {
    return CartModel.findById(id);
  }

  static async create(cartData) {
    const newCart = new CartModel(cartData);
    return newCart.save();
  }

  static async updateById(id, updateData) {
    return CartModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async addOrUpdateProduct(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId,
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    return cart.save();
  }

  static async deleteById(id) {
    return CartModel.findByIdAndDelete(id);
  }

  static async deleteProductById(cartId, productId) {
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { productId } } },
      { new: true },
    );
    return updatedCart;
  }
}
