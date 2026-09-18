import mongoose from 'mongoose';

// Matches src/data/products.ts -> Testimonial interface
// (renamed to "Review" because it's easier to understand: it's a customer review)
const reviewSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    text: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    location: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
