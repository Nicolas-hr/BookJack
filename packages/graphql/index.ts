import { ApolloServer, gql } from "apollo-server-express";
import { merge } from "lodash";

import {
  typeDefs as userSchema,
  resolvers as userResolvers,
} from "./schema/User";

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
  typeDefs: [typeDefs, userSchema],
  resolvers: merge(resolvers, userResolvers),
});

export default server;
