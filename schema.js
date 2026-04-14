import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gql } from 'apollo-server';
import { getDB } from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schema = fs.readFileSync(
  path.join(__dirname, './schema.graphqls'),
  'utf8',
);

export const typeDefs = gql(schema);

function formatDocument(doc) {
  if (!doc) return null;

  let numericId = doc.id;

  if (!numericId && doc._id) {
    if (typeof doc._id === 'object' && doc._id.toString) {
      const idString = doc._id.toString();
      numericId = parseInt(idString.substring(0, 8), 16);
    } else if (typeof doc._id === 'string') {
      numericId = parseInt(doc._id.substring(0, 8), 16);
    } else {
      numericId = Math.floor(Math.random() * 1000000);
    }
  }

  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: numericId || rest.id,
  };
}

function formatDocuments(docs) {
  if (!docs || !Array.isArray(docs)) return [];
  return docs.map((doc) => formatDocument(doc));
}

export const resolvers = {
  Query: {
    Countries: async () => {
      try {
        const db = getDB();
        const countries = await db.collection('countries').find({}).toArray();
        return formatDocuments(countries);
      } catch (error) {
        console.error('Error in Countries:', error);
        return [];
      }
    },

    Country: async (parent, args) => {
      try {
        const db = getDB();
        const { iso2 } = args;
        const country = await db.collection('countries').findOne({
          iso2: { $regex: new RegExp(`^${iso2}$`, 'i') },
        });
        return formatDocument(country);
      } catch (error) {
        console.error('Error in Country:', error);
        return null;
      }
    },

    CountriesByRegion: async (parent, args) => {
      try {
        const db = getDB();
        const { region } = args;
        const countries = await db
          .collection('countries')
          .find({
            region: { $regex: new RegExp(`^${region}$`, 'i') },
          })
          .toArray();
        return formatDocuments(countries);
      } catch (error) {
        console.error('Error in CountriesByRegion:', error);
        return [];
      }
    },

    CountriesBySubregion: async (parent, args) => {
      try {
        const db = getDB();
        const { subregion } = args;
        const countries = await db
          .collection('countries')
          .find({
            subregion: { $regex: new RegExp(`^${subregion}$`, 'i') },
          })
          .toArray();
        return formatDocuments(countries);
      } catch (error) {
        console.error('Error in CountriesBySubregion:', error);
        return [];
      }
    },

    States: async () => {
      try {
        const db = getDB();
        const states = await db.collection('states').find({}).toArray();
        return formatDocuments(states);
      } catch (error) {
        console.error('Error in States:', error);
        return [];
      }
    },

    StatesByCountry: async (parent, args) => {
      try {
        const db = getDB();
        const { country_name } = args;

        const states = await db
          .collection('states')
          .find({
            country_name: { $regex: new RegExp(`^${country_name}$`, 'i') },
          })
          .toArray();

        return formatDocuments(states);
      } catch (error) {
        console.error('Error in StatesByCountry:', error);
        return [];
      }
    },

    State: async (parent, args) => {
      try {
        const db = getDB();
        const { name } = args;

        let state = await db.collection('statescities').findOne({
          name: { $regex: new RegExp(`^${name}$`, 'i') },
        });

        if (!state) {
          state = await db.collection('states').findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
          });
        }

        return formatDocument(state);
      } catch (error) {
        console.error('Error in State:', error);
        return null;
      }
    },

    Cities: async () => {
      try {
        const db = getDB();
        const cities = await db
          .collection('cities')
          .find({})
          .limit(100)
          .toArray();
        return formatDocuments(cities);
      } catch (error) {
        console.error('Error in Cities:', error);
        return [];
      }
    },

    CitiesByState: async (parent, args) => {
      try {
        const db = getDB();
        const { state_name } = args;

        const cities = await db
          .collection('cities')
          .find({
            state_name: { $regex: new RegExp(`^${state_name}$`, 'i') },
          })
          .limit(100)
          .toArray();

        return formatDocuments(cities);
      } catch (error) {
        console.error('Error in CitiesByState:', error);
        return [];
      }
    },

    CitiesByCountry: async (parent, args) => {
      try {
        const db = getDB();
        const { country_name } = args;

        const cities = await db
          .collection('cities')
          .find({
            country_name: { $regex: new RegExp(`^${country_name}$`, 'i') },
          })
          .limit(100)
          .toArray();

        return formatDocuments(cities);
      } catch (error) {
        console.error('Error in CitiesByCountry:', error);
        return [];
      }
    },

    City: async (parent, args) => {
      try {
        const db = getDB();
        const { name } = args;

        const city = await db.collection('cities').findOne({
          name: { $regex: new RegExp(`^${name}$`, 'i') },
        });

        return formatDocument(city);
      } catch (error) {
        console.error('Error in City:', error);
        return null;
      }
    },
  },
};
