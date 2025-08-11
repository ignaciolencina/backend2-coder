import { ProductRepository } from '../repositories/ProductRepository.js';
import { CartRepository } from '../repositories/CartRepository.js';
import { TicketRepository } from '../repositories/TicketRepository.js';

export class PurchaseService {
  static async processPurchase(cartId, purchaserEmail) {
    try {
      const cart = await CartRepository.getCartById(cartId);
      
      if (!cart || !cart.products || cart.products.length === 0) {
        throw new Error('Carrito no encontrado o vacío');
      }

      const productsToProcess = cart.products;
      const purchasedProducts = [];
      const failedProducts = [];
      let totalAmount = 0;

      for (const cartProduct of productsToProcess) {
        const product = await ProductRepository.getProductById(cartProduct.productId);
        
        if (!product) {
          failedProducts.push(cartProduct.productId);
          continue;
        }

        if (product.stock >= cartProduct.quantity) {
          const productTotal = product.price * cartProduct.quantity;
          totalAmount += productTotal;
          
          const newStock = product.stock - cartProduct.quantity;
          await ProductRepository.updateProduct(product.id, { stock: newStock });
          
          purchasedProducts.push({
            productId: cartProduct.productId,
            quantity: cartProduct.quantity,
            price: product.price,
            name: product.name
          });
        } else {
          failedProducts.push(cartProduct.productId);
        }
      }

      let ticket = null;
      
      if (purchasedProducts.length > 0) {
        const ticketData = {
          amount: totalAmount,
          purchaser: purchaserEmail,
        };
        
        ticket = await TicketRepository.createTicket(ticketData);
      }

      const remainingProducts = cart.products.filter(cartProduct =>
        failedProducts.includes(cartProduct.productId)
      );

      await CartRepository.updateCart(cartId, { products: remainingProducts });

      return {
        success: true,
        ticket,
        purchasedProducts,
        failedProductIds: failedProducts,
        totalAmount,
      };
      
    } catch (error) {
      console.error('Error processing purchase:', error);
      throw error;
    }
  }
}