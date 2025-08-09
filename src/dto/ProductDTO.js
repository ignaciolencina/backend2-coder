export class ProductDTO {
  constructor(product) {
    this.id = product._id || product.id;
    this.name = product.name;
    this.description = product.description;
    this.code = product.code;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
  }

  static fromProduct(product) {
    return new ProductDTO(product);
  }

  static fromProducts(products) {
    return products.map((product) => new ProductDTO(product));
  }
}
