export class CartDTO {
  constructor(cart) {
    this.id = cart._id || cart.id;
    this.userId = cart.userId;
    this.products = cart.products;
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }

  static fromCart(cart) {
    return new CartDTO(cart);
  }

  static fromCarts(carts) {
    return carts.map((cart) => new CartDTO(cart));
  }
}
