import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
let client = null;

export async function connectDB() {
  if (db) return db;

  try {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) {
      throw new Error('MONGO_DB_URI is not defined in .env file');
    }

    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');

    db = client.db('data');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}
