import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/innovathon');
  console.log('Connected to MongoDB.');
  const db = mongoose.connection.db;
  
  // 1. Unset firebaseUid if it is null
  const res = await db.collection('users').updateMany({firebaseUid: null}, {$unset: {firebaseUid: 1}});
  console.log('Unset null firebaseUids:', res.modifiedCount);

  // 2. Drop the existing firebaseUid index if it exists
  try {
    await db.collection('users').dropIndex('firebaseUid_1');
    console.log('Dropped old index');
  } catch(e) {
    console.log('Index not found or already dropped:', e.message);
  }

  process.exit(0);
}
run();
