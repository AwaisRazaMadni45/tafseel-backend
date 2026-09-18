// Vercel Serverless Entry Point

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDatabase from '../src/config/database.js';
import { routeNotFound, handleErrors } from '../src/middleware/handleErrors.js';

import productRoutes from '../src/routes/productRoutes.js';
import galleryRoutes from '../src/routes/galleryRoutes.js';
import reviewRoutes from '../src/routes/reviewRoutes.js';
import contactRoutes from '../src/routes/contactRoutes.js';
import adminRoutes from '../src/routes/adminRoutes.js';
import imageUploadRoutes from '../src/routes/imageUploadRoutes.js';

const app = express();

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: har request se pehle MongoDB connect karo (cached rahega)
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Tafseel API is running on Vercel' });
});

app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', imageUploadRoutes);

app.use(routeNotFound);
app.use(handleErrors);

export default app;
