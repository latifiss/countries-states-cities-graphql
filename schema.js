import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gql } from 'apollo-server';
import { GraphQLError } from 'graphql';
import { getDB } from './database/db.js';
import { withCache } from './lib/cache.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schema = fs.readFileSync(path.join(__dirname, 'schema.graphqls'), 'utf8');
export const typeDefs = gql(schema);

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatDocument(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  let id = rest.id;
  if (!Number.isInteger(id) && _id != null) {
    const hex = String(_id).slice(0, 8);
    const parsed = Number.parseInt(hex, 16);
    id = Number.isFinite(parsed) ? parsed : null;
  }
  return { ...rest, ...(id != null ? { id } : {}) };
}

const formatDocuments = (docs) =>
  Array.isArray(docs) ? docs.map(formatDocument) : [];

const exact = (value) => new RegExp(`^${escapeRegex(value)}$`, 'i');

export const resolvers = {
  Query: {
    Countries: async () => formatDocuments(
      await getDB().collection('countries').find({}).toArray(),
    ),
    Country: async (_, { iso2 }) => formatDocument(
      await getDB().collection('countries').findOne({ iso2: exact(iso2) }),
    ),
    CountriesByRegion: async (_, { region }) => formatDocuments(
      await getDB().collection('countries').find({ region: exact(region) }).toArray(),
    ),
    CountriesBySubregion: async (_, { subregion }) => formatDocuments(
      await getDB().collection('countries').find({ subregion: exact(subregion) }).toArray(),
    ),
    States: async () => formatDocuments(
      await getDB().collection('states').find({}).toArray(),
    ),
    StatesByCountry: async (_, { country_name }) => formatDocuments(
      await getDB().collection('states').find({ country_name: exact(country_name) }).toArray(),
    ),
    State: async (_, { name }) => {
      const db = getDB();
      const query = { name: exact(name) };
      const state = await db.collection('statescities').findOne(query)
        ?? await db.collection('states').findOne(query);
      return formatDocument(state);
    },
    Cities: async () => formatDocuments(
      await getDB().collection('cities').find({}).limit(100).toArray(),
    ),
    CitiesByState: async (_, { state_name }) => formatDocuments(
      await getDB().collection('cities').find({ state_name: exact(state_name) }).limit(100).toArray(),
    ),
    CitiesByCountry: async (_, { country_name }) => formatDocuments(
      await getDB().collection('cities').find({ country_name: exact(country_name) }).limit(100).toArray(),
    ),
    City: async (_, { name }) => formatDocument(
      await getDB().collection('cities').findOne({ name: exact(name) }),
    ),
  },
};

// Cache only successful resolver results. MongoDB errors propagate to GraphQL
// and are never stored as empty arrays or null cache entries.
for (const [name, resolver] of Object.entries(resolvers.Query)) {
  resolvers.Query[name] = (parent, args, context, info) =>
    withCache(`graphql:${name}`, args ?? {}, 3600, () =>
      resolver(parent, args, context, info),
    );
}
