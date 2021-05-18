import { ApolloServer, gql } from "apollo-server-express";
import { merge } from "lodash";

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: merge(resolvers),
});

export default server;
