import mongoose from 'mongoose';

// Matches src/data/products.ts -> GalleryImage interface
const galleryPhotoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['sofas', 'curtains', 'majlis'],
    },
    image: {
      type: String,
      required: true,
    },
    caption: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryPhoto', galleryPhotoSchema);
