require('dotenv').config();
const { MongoClient } = require('mongodb');
const countries = require('./data/countries.json');
const states = require('./data/states.json');
const cities = require('./data/cities.json');

async function migrate() {
  let client;
  try {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) {
      throw new Error('MONGO_DB_URI is not defined in .env file');
    }

    console.log('📦 Starting migration to MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('data');

    const countriesCount = await db.collection('countries').countDocuments();
    const statesCount = await db.collection('states').countDocuments();
    const citiesCount = await db.collection('cities').countDocuments();

    if (countriesCount > 0 || statesCount > 0 || citiesCount > 0) {
      console.log(
        '⚠️  Collections already have data. Skipping migration to avoid duplicates.',
      );
      console.log(
        `Countries: ${countriesCount}, States: ${statesCount}, Cities: ${citiesCount}`,
      );
      return;
    }

    console.log(`📥 Inserting ${countries.length} countries...`);
    await db.collection('countries').insertMany(countries);

    console.log(`📥 Inserting ${states.length} states...`);
    await db.collection('states').insertMany(states);

    console.log(`📥 Inserting ${cities.length} cities...`);
    await db.collection('cities').insertMany(cities);

    console.log('🔍 Creating database indexes...');
    await db.collection('countries').createIndex({ name: 1 });
    await db.collection('countries').createIndex({ region: 1 });
    await db.collection('states').createIndex({ name: 1 });
    await db.collection('states').createIndex({ country_id: 1 });
    await db.collection('cities').createIndex({ name: 1 });
    await db.collection('cities').createIndex({ state_id: 1 });
    await db.collection('cities').createIndex({ country_id: 1 });

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

migrate();
