import nextApp from "@bookjack/client";
import apolloServer from "@bookjack/graphql";
import express from "express";

const { PORT } = process.env;

/**
 * Main Apollo server function
 */
async function main() {
  const app = express();

  await bootstrapApolloServer(app);
  await bootstrapClientApp(app);

  app.listen(PORT, () => {
    console.log(`[ server ] ready on port ${PORT}`);
  });
}

/**
 * Tied Apollo and Experss together
 * @param expressApp The express app
 */
async function bootstrapClientApp(expressApp) {
  await nextApp.prepare();
  expressApp.get("*", nextApp.getRequestHandler());
}

/**
 * Tied express middleware to apollo
 * @param expressApp The express app
 */
async function bootstrapApolloServer(expressApp) {
  apolloServer.applyMiddleware({ app: expressApp });
}

main();
