import CartModel from '../../models/cartSchema.js';

export class CartDAO {
  static async findAll() {
    return CartModel.find()
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async findById(id) {
    return CartModel.findById(id)
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async findByUserId(userId) {
    return CartModel.find({ userId })
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async create(cartData) {
    const newCart = new CartModel(cartData);
    const savedCart = await newCart.save();
    return CartModel.findById(savedCart._id)
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async updateById(id, updateData) {
    return CartModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
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

    const savedCart = await cart.save();
    return CartModel.findById(savedCart._id)
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async deleteById(id) {
    return CartModel.findByIdAndDelete(id)
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
  }

  static async deleteProductById(cartId, productId) {
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { productId } } },
      { new: true },
    )
      .populate('userId', 'first_name last_name email')
      .populate('products.productId', 'name price code stock');
    return updatedCart;
  }
}