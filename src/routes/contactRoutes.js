import express from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController.js';
import checkLogin from '../middleware/checkLogin.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', checkLogin, getContactMessages);

export default router;
