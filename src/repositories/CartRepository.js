import { CartDAO } from '../dao/mongo/CartDAO.js';
import { CartDTO } from '../dto/CartDTO.js';

export class CartRepository {
  static async getAllCarts() {
    const carts = await CartDAO.findAll();
    return CartDTO.fromCarts(carts);
  }

  static async getCartById(id) {
    const cart = await CartDAO.findById(id);
    return cart ? CartDTO.fromCart(cart) : null;
  }

  static async getCartsByUserId(userId) {
    const carts = await CartDAO.findByUserId(userId);
    return CartDTO.fromCarts(carts);
  }

  static async createCart(cartData) {
    const newCart = await CartDAO.create(cartData);
    return CartDTO.fromCart(newCart);
  }

  static async updateCart(id, updateData) {
    const updatedCart = await CartDAO.updateById(id, updateData);
    return updatedCart ? CartDTO.fromCart(updatedCart) : null;
  }

  static async addOrUpdateProduct(cartId, productId, quantity) {
    const updatedCart = await CartDAO.addOrUpdateProduct(
      cartId,
      productId,
      quantity,
    );
    return updatedCart ? CartDTO.fromCart(updatedCart) : null;
  }

  static async deleteCart(id) {
    const deletedCart = await CartDAO.deleteById(id);
    return deletedCart ? CartDTO.fromCart(deletedCart) : null;
  }

  static async deleteProductFromCart(cartId, productId) {
    const updatedCart = await CartDAO.deleteProductById(cartId, productId);
    return updatedCart ? CartDTO.fromCart(updatedCart) : null;
  }
}