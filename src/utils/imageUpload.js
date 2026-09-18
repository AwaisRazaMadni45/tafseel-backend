import multer from 'multer';
import path from 'path';

// Vercel ka filesystem read-only hai — disk storage kaam nahi karta.
// memoryStorage use karo: file req.file.buffer mein available hogi.
// Upload route is buffer ko base64 Data URL mein convert karke return karta hai.
// Production mein isko Cloudinary/S3 se replace kar sakte hain bina route code change kiye.

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, .png and .webp images are allowed'));
  }
};

const imageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default imageUpload;
