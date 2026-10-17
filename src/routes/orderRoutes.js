import express from 'express';
import { createOrder, getOrders, deleteOrder } from '../controllers/orderController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.get('/',    checkLogin, getOrders);
router.post('/',   checkLogin, createOrder);
router.delete('/:id', checkLogin, deleteOrder);

export default router;
