// Local development server — Vercel par yeh file use nahi hoti.
// Vercel api/index.js ko directly run karta hai.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/database.js';
import { routeNotFound, handleErrors } from './middleware/handleErrors.js';

import productRoutes from './routes/productRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import imageUploadRoutes from './routes/imageUploadRoutes.js';

connectDatabase();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Tafseel API is running (local)' });
});

app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', imageUploadRoutes);

app.use(routeNotFound);
app.use(handleErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
