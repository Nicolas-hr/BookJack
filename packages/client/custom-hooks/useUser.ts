import {
  gql,
  useQuery,
  useMutation,
  ApolloQueryResult,
} from "@apollo/react-hooks";
import { useCallback, useState } from "react";

/**
 * GraphQL queries
 */
const CREATE_USER = gql`
  mutation ($id: String!, $username: String!) {
    addUser(id: $id, username: $username) {
      userId
      userUsername
    }
  }
`;

const SEARCH_USER_BY_ID = gql`
  query ($id: String!) {
    searchUserById(id: $id) {
      userId
    }
  }
`;

const SEARCH_USER_BY_USERNAME = gql`
  query ($username: String!) {
    searchUserByUsername(username: $username) {
      userId
    }
  }
`;

/**
 * Custom hook fo manage user
 * @returns Custom hook's functions and states
 */
export const useUser = () => {
  /**
   * States
   */
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [exists, setUserExists] = useState(false);

  /**
   * GraphQL
   */
  const { refetch: searchUserById } = useQuery(SEARCH_USER_BY_ID, {
    variables: {
      id: "",
    },
  });
  const { refetch: searchUserByUsername } = useQuery(SEARCH_USER_BY_USERNAME, {
    variables: {
      username: "",
    },
  });
  const [_createUser, { data: createdUser }] = useMutation(CREATE_USER);

  /**
   * Does a use exists
   * @param {string} id Id of the checked user
   */
  const userExists = useCallback(
    async (keys: { id?: string; username?: string }): Promise<boolean> => {
      const id = keys?.id;
      const username = keys?.username;

      // Edges case handling
      if (id === null && username === null) {
        Promise.reject("No key provided");
      }

      // Search user in db
      if (id) {
        const _foundUser = await searchUserById({
          id,
        });

        return _foundUser?.data?.searchUserById ? true : false;
      } else if (username) {
        const _foundUser = await searchUserByUsername({
          username,
        });

        return _foundUser?.data?.searchUserByUsername ? true : false;
      }
    },
    []
  );

  /**
   * Create a new user in the database
   * @param {string} id Id of the new user
   */
  const createUser = useCallback(
    async (keys: { id: string; username: string }) => {
      setLoading(true);
      const { id, username } = keys;

      // Does user exists
      console.log(exists);

      // Create user in db
      const created = await _createUser({
        variables: {
          id,
          username,
        },
      });

      setUser(created?.data ?? null);
      setLoading(false);
    },
    [userExists]
  );

  return { isLoading, exists, user, userExists, createUser };
};
