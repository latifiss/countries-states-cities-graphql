import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { GraphQLError } from 'graphql';
import { typeDefs, resolvers } from './schema.js';
import { connectDB, closeDB } from './database/db.js';

const isProduction = process.env.NODE_ENV === 'production';
const port = Number.parseInt(process.env.PORT ?? '4000', 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

function depthLimitRule(maxDepth) {
  return (context) => {
    let depth = 0;
    let fieldCount = 0;
    return {
      Field: {
        enter() {
          depth += 1;
          fieldCount += 1;
          if (depth > maxDepth) {
            context.reportError(new GraphQLError(`Query exceeds the maximum depth of ${maxDepth}.`));
          }
          if (fieldCount > 100) {
            context.reportError(new GraphQLError('Query exceeds the maximum of 100 fields.'));
          }
        },
        leave() {
          depth -= 1;
        },
      },
    };
  };
}

let server;
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Received ${signal}; shutting down gracefully.`);

  try {
    if (server) await server.stop();
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error.message);
    process.exit(1);
  }
}

async function startServer() {
  await connectDB();

  server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: !isProduction,
    playground: !isProduction,
    debug: !isProduction,
    bodyParserConfig: { limit: '1mb' },
    validationRules: [depthLimitRule(10)],
    formatError(error) {
      if (!isProduction) return error;
      return {
        message: error.message,
        ...(error.locations ? { locations: error.locations } : {}),
        ...(error.path ? { path: error.path } : {}),
      };
    },
    context: () => ({}),
  });

  const { url } = await server.listen({ port, host: '0.0.0.0' });
  console.log(`CountriesQL API listening on ${url}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

startServer().catch(async (error) => {
  console.error('Failed to start CountriesQL API:', error.message);
  try {
    await closeDB();
  } finally {
    process.exit(1);
  }
});
