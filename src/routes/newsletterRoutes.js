import express from 'express';
import { subscribe, getSubscribers } from '../controllers/newsletterController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', checkLogin, getSubscribers);

export default router;
