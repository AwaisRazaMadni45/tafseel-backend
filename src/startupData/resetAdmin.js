// Run once: node src/startupData/resetAdmin.js
// Deletes existing admin and creates fresh one from .env
import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to:', process.env.MONGO_URI.split('@')[1]?.split('/')[1] || 'database');

    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD in .env');
    }

    // Delete existing admin with same username
    const deleted = await Admin.deleteMany({ username: ADMIN_USERNAME });
    console.log(`Deleted ${deleted.deletedCount} existing admin(s)`);

    // Create fresh admin (password will be hashed by model pre-save hook)
    await Admin.create({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    console.log(`Admin "${ADMIN_USERNAME}" created with password "${ADMIN_PASSWORD}"`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
