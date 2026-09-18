// Vercel Serverless Entry Point
// Vercel runs this file as a serverless function.
// We export the Express app — Vercel handles the HTTP lifecycle.

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

// Connect to MongoDB (Mongoose caches the connection across warm invocations)
connectDatabase();

const app = express();

// CORS — allow the frontend Vercel URL and localhost for dev
const allowedOrigins = [
  process.env.CLIENT_URL,          // e.g. https://tafseel.vercel.app
  'http://localhost:5173',          // Vite dev server
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, same-origin SSR)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Export for Vercel — do NOT call app.listen() here
export default app;
