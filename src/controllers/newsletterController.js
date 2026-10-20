import Newsletter from '../models/Newsletter.js';

// POST /api/newsletter
export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(200).json({ message: 'Already subscribed' });

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /api/newsletter (admin only)
export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
};
