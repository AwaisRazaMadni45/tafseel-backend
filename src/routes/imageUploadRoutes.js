import express from 'express';
import imageUpload from '../utils/imageUpload.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

// POST /api/upload (admin only) — field name must be "image"
//
// Vercel par disk storage nahi hai, isliye image ko base64 Data URL mein
// convert karke return kiya jata hai.
// Frontend/admin panel is URL ko seedha Product.images[] ya GalleryPhoto.image
// mein save kar sakta hai — koi alag hosting nahi chahiye.
//
// Agar future mein Cloudinary/S3 chahiye to sirf yahan logic change karo,
// baki codebase same rahega.

router.post('/', checkLogin, imageUpload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Buffer ko base64 Data URL mein convert karo
  const base64 = req.file.buffer.toString('base64');
  const mimeType = req.file.mimetype; // e.g. image/jpeg
  const dataUrl = `data:${mimeType};base64,${base64}`;

  res.status(201).json({ url: dataUrl });
});

export default router;
