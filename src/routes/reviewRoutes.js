import express from 'express';
import {
  getReviews,
  createReview,
  deleteReview,
} from '../controllers/reviewController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', checkLogin, createReview);
router.delete('/:id', checkLogin, deleteReview);

export default router;
