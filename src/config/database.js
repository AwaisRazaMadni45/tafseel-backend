import mongoose from 'mongoose';

const connectDatabase = async () => {
  // Already connected — Mongoose caches the connection
  if (mongoose.connection.readyState >= 1) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log but don't crash the serverless function
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

export default connectDatabase;
