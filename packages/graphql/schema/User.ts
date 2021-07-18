import { gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = gql`
  type User {
    id: String!
    username: String
    email: String!
    image: String
  }

  extend type Query {
    allUsers: [User!]!
    searchUserByUsername(username: String!): User
    searchUserByEmail(email: String!): User
  }

  extend type Mutation {
    addUser(email: String!, username: String!): User
  }
`;

export const resolvers = {
  Query: {
    /**
     * Return all the users
     * @returns List of all the users
     */
    allUsers: () => {
      return prisma.user.findMany();
    },

    /**
     * Find and return the user by id
     * @param param1 Object destructuring to get the `id` from the `args` argument
     * @returns Found user or null
     */
    searchUserByEmail: (parent, { email }, ctx, info) => {
      return prisma.user.findUnique({
        where: {
          email,
        },
      });
    },

    /**
     * Find and return the user by username
     * @param param1 Object destructuring to get the `id` from the `args` argument
     * @returns Found user or null
     */
    searchUserByUsername: (parent, { username }, ctx, info) => {
      return prisma.user.findUnique({
        where: {
          username,
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
    addUser: (parent, { email, username }, ctx, info) => {
      return prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          username,
        },
      });
    },
  },
};
