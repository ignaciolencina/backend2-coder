import mongoose from 'mongoose';

const Ticket = new mongoose.Schema(
  {
    purchase_datetime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Tickets', Ticket);