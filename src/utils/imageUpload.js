import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage — images upload directly to Cloudinary
// Returns a permanent CDN URL (fast, no MongoDB bloat)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tafseel',           // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }
    ],
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
  if (isValid) cb(null, true);
  else cb(new Error('Only .jpeg, .jpg, .png and .webp images are allowed'));
};

const imageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default imageUpload;
