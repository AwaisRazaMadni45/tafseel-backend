import express from 'express';
import {
  getGalleryPhotos,
  createGalleryPhoto,
  deleteGalleryPhoto,
} from '../controllers/galleryController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.get('/', getGalleryPhotos);
router.post('/', checkLogin, createGalleryPhoto);
router.delete('/:id', checkLogin, deleteGalleryPhoto);

export default router;
