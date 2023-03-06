import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./schema.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

console.clear();
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
