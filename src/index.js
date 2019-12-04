import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {
  PORT,
  IN_PRODUCTION,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} from "./config";

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PRODUCTION
    });

    const app = express();
    app.disable("x-powered-by");

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () => {
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (e) {
    console.error(e);
  }
})();
