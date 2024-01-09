
// utils/mongo.js
import mongoose from 'mongoose';

let cachedDb = null;

export default async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

const URI = process.env.MONGODB_URI;
  const OPTION = { user: process.env.USER, pass: process.env.PASSWORD, autoIndex: true };

  try {
    // const db = await mongoose.connect(URI, OPTION);
    const db = await mongoose.connect(URI, OPTION);
    console.log('MongoDB connected');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
