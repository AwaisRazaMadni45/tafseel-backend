import mongoose from 'mongoose';

// Manual order/sale entry — admin khud bharta hai jab WhatsApp/Contact se koi order confirm ho
const orderSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    quantity:    { type: Number, required: true, default: 1 },
    price:       { type: Number, required: true }, // per unit price at time of sale
    customerName:  { type: String, required: true, trim: true },
    customerPhone: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
