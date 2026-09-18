import ContactMessage from '../models/ContactMessage.js';

// POST /api/contact - called from Contact.tsx form submission
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone and message are all required' });
    }

    const contactMessage = await ContactMessage.create({ name, phone, message });
    res.status(201).json({ message: 'Message received successfully', contactMessage });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact (admin only) - view submitted inquiries
export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
