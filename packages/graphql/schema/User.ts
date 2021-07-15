import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = gql`
  type User {
    userId: String!
    userUsername: String
  }

  extend type Query {
    allUsers: [User!]!
    searchUserById(id: String!): User
    searchUserByUsername(username: String!): User
  }

  extend type Mutation {
    addUser(id: String!, username: String!): User
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
     * Find and return the user by id
     * @param param1 Object destructuring to get the `id` from the `args` argument
     * @returns Found user or null
     */
    searchUserById: (parent, { id }, ctx, info) => {
      return prisma.users.findUnique({
        where: {
          userId: id,
        },
      });
    },

    /**
     * Find and return the user by username
     * @param param1 Object destructuring to get the `id` from the `args` argument
     * @returns Found user or null
     */
    searchUserByUsername: (parent, { username }, ctx, info) => {
      return prisma.users.findUnique({
        where: {
          userUsername: username,
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
    addUser: (parent, { id, username }, ctx, info) => {
      return prisma.users.upsert({
        where: { userId: id },
        update: {},
        create: {
          userId: id,
          userUsername: username,
        },
      });
    },
  },
};
