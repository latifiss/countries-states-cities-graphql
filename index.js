import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema.js';
import { connectDB } from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
      context: async () => {
        return {};
      },
    });

    const { url } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`🚀 Server ready at ${url}`);
    console.log(`📊 GraphQL Playground available at ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
