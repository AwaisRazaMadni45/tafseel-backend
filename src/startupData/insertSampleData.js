// Run once with: npm run insert-sample-data
// Inserts the products/gallery photos/reviews that used to be hardcoded in
// the frontend's src/data/products.ts into MongoDB.
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import GalleryPhoto from '../models/GalleryPhoto.js';
import Review from '../models/Review.js';
import { sampleProducts, sampleGalleryPhotos, sampleReviews } from './sampleData.js';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear out old data first so re-running this script doesn't duplicate entries
    await Product.deleteMany({});
    await GalleryPhoto.deleteMany({});
    await Review.deleteMany({});

    await Product.insertMany(sampleProducts);
    await GalleryPhoto.insertMany(sampleGalleryPhotos);
    await Review.insertMany(sampleReviews);

    console.log(`Inserted ${sampleProducts.length} products`);
    console.log(`Inserted ${sampleGalleryPhotos.length} gallery photos`);
    console.log(`Inserted ${sampleReviews.length} reviews`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
