import mongoose from 'mongoose';

// Matches the shape frontend expects from src/data/products.ts (Product interface)
// plus a couple of extra fields (price, isFeatured) for future use.
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['sofas', 'curtains', 'majlis'],
    },
    name: {
      en: { type: String, required: false, trim: true, default: 'Untitled' },
      ar: { type: String, required: false, trim: true, default: 'بدون عنوان' },
    },
    description: {
      en: { type: String, required: false, default: '-' },
      ar: { type: String, required: false, default: '-' },
    },
    images: {
      type: [String], // array of image URLs
      required: true,
      validate: (val) => Array.isArray(val) && val.length > 0,
    },
    price: {
      type: Number, // optional, not shown on frontend yet but kept for future use
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
