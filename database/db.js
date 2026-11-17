import { MongoClient } from 'mongodb';
import 'dotenv/config';

let client;
let db;
let connectionPromise;

export async function connectDB() {
  if (db) return db;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) throw new Error('MONGO_DB_URI is required.');

    client = new MongoClient(uri, {
      appName: 'CountriesQL',
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      maxPoolSize: Number.parseInt(process.env.MONGO_MAX_POOL_SIZE ?? '20', 10),
      minPoolSize: 0,
      maxIdleTimeMS: 60000,
      retryReads: true,
      retryWrites: true,
    });

    try {
      await client.connect();
      db = client.db(process.env.MONGO_DB_NAME || 'data');
      await db.command({ ping: 1 });
      console.log('Connected to MongoDB.');

      await Promise.all([
        db.collection('countries').createIndex({ iso2: 1 }),
        db.collection('countries').createIndex({ region: 1 }),
        db.collection('countries').createIndex({ subregion: 1 }),
        db.collection('states').createIndex({ country_name: 1 }),
        db.collection('states').createIndex({ name: 1 }),
        db.collection('statescities').createIndex({ name: 1 }),
        db.collection('cities').createIndex({ state_name: 1 }),
        db.collection('cities').createIndex({ country_name: 1 }),
        db.collection('cities').createIndex({ name: 1 }),
      ]);

      return db;
    } catch (error) {
      await client.close().catch(() => {});
      client = undefined;
      db = undefined;
      throw error;
    }
  })();

  try {
    return await connectionPromise;
  } finally {
    connectionPromise = undefined;
  }
}

export function getDB() {
  if (!db) throw new Error('Database is not connected.');
  return db;
}

export async function closeDB() {
  const activeClient = client;
  client = undefined;
  db = undefined;
  if (activeClient) {
    await activeClient.close();
    console.log('MongoDB connection closed.');
  }
}
