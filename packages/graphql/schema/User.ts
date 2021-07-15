import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = gql`
  type User {
    userId: String!
    userFirstName: String
    userLastName: String
  }

  extend type Query {
    allUsers: [User!]!
    searchUser(id: String!): User
  }

  extend type Mutation {
    addUser(id: String!): User
  }
`;

export const resolvers = {
  Query: {
    /**
     * Return all the users
     * @returns List of all the users
     */
    allUsers: () => {
      return prisma.users.findMany();
    },

    /**
     * Find and return the user
     * @param param1 Object destructuring to get the `id` from the `args` argument
     * @returns Found user or null
     */
    searchUser: (parent, { id }, ctx, info) => {
      return prisma.users.findUnique({
        where: {
          userId: id,
        },
      });
    },
  },
  Mutation: {
    /**
     * Create a new user
     * @param param1 Object destructuring to get the `id, email, name, and address` from the `args` argument
     * @returns The created user
     */
    addUser: (parent, { id }, ctx, info) => {
      return prisma.users.upsert({
        where: { userId: id },
        update: {},
        create: {
          userId: id,
        },
      });
    },
  },
};
