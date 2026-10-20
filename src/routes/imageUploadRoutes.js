import express from 'express';
import imageUpload from '../utils/imageUpload.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

// POST /api/upload (admin only) — field name must be "image"
// Cloudinary storage engine handles the upload directly
// req.file.path contains the Cloudinary CDN URL
router.post('/', checkLogin, imageUpload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Cloudinary returns the URL in req.file.path
  res.status(201).json({ url: req.file.path });
});

export default router;
