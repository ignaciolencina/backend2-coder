import mongoose from 'mongoose';

const Cart = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

Cart.index({ userId: 1 });

export default mongoose.model('Carts', Cart);
