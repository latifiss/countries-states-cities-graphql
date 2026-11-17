import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const loadJson = async (name) => JSON.parse(await readFile(path.join(directory, 'data', name), 'utf8'));

async function upsertCollection(db, name, documents) {
  if (!Array.isArray(documents) || documents.length === 0) {
    throw new Error(`Refusing to migrate empty ${name} dataset.`);
  }
  const collection = db.collection(name);
  const operations = documents.map((document) => ({
    replaceOne: {
      filter: { id: document.id },
      replacement: document,
      upsert: true,
    },
  }));

  for (let offset = 0; offset < operations.length; offset += 500) {
    await collection.bulkWrite(operations.slice(offset, offset + 500), { ordered: false });
  }
  console.log(`Upserted ${documents.length} records into ${name}.`);
}

async function migrate() {
  const uri = process.env.MONGO_DB_URI;
  if (!uri) throw new Error('MONGO_DB_URI is required.');

  const [countries, states, cities] = await Promise.all([
    loadJson('countries.json'),
    loadJson('states.json'),
    loadJson('cities.json'),
  ]);
  const client = new MongoClient(uri, {
    appName: 'CountriesQL-Migration',
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 5,
  });

  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME || 'data');
    await upsertCollection(db, 'countries', countries);
    await upsertCollection(db, 'states', states);
    await upsertCollection(db, 'cities', cities);
    console.log('Migration completed.');
  } finally {
    await client.close();
  }
}

migrate().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exitCode = 1;
});
