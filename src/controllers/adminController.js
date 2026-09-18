import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (admin) =>
  jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

// POST /api/admin/login
// NOTE: there is intentionally no public "register" route.
// The first admin account is created once via `npm run create-admin`.
export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      token: generateToken(admin),
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    next(error);
  }
};
// POST /api/admin/register
export const registerAdmin = async (req, res, next) => {
  try {
    const { username, password, secretKey } = req.body;

    if (!username || !password || !secretKey) {
      return res.status(400).json({ message: 'username, password and secretKey are all required' });
    }

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid secret key' });
    }

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'That username is already taken' });
    }

    const admin = await Admin.create({ username, password });
    res.status(201).json({
      message: 'Admin account created successfully',
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    next(error);
  }
};