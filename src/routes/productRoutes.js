import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  incrementViews,
} from '../controllers/productController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.get('/',         getProducts);
router.get('/:id',      getProductById);
router.post('/',        checkLogin, createProduct);
router.put('/:id',      checkLogin, updateProduct);
router.delete('/:id',   checkLogin, deleteProduct);
router.patch('/:id/view', incrementViews); // public — no auth needed

export default router;
