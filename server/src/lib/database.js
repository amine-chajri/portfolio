import mongoose from 'mongoose';
import { config } from '../config.js';

let mode = 'file';

export async function connectDatabase() {
  if (!config.mongoUri) {
    console.info('[api] MONGODB_URI not set — contact messages will use local JSON storage.');
    return mode;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    mode = 'mongodb';
    console.info('[api] Connected to MongoDB.');
  } catch (error) {
    mode = 'file';
    console.warn(`[api] MongoDB connection failed — falling back to local JSON storage. ${error.message}`);
  }

  return mode;
}

export function storageMode() {
  return mongoose.connection.readyState === 1 ? 'mongodb' : mode;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
