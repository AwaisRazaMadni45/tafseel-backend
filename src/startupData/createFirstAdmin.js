// Run once with: npm run create-admin
// Reads ADMIN_USERNAME and ADMIN_PASSWORD from .env and creates the admin account.
// There is no public "register" page on purpose - this is the only way to make an admin.
import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD in your .env file first');
    }

    const existing = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existing) {
      console.log(`Admin "${ADMIN_USERNAME}" already exists. Nothing to do.`);
    } else {
      await Admin.create({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
      console.log(`Admin account "${ADMIN_USERNAME}" created successfully.`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
