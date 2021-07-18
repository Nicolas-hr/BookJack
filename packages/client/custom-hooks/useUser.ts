import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import { useCallback, useState } from "react";

/**
 * GraphQL queries
 */
const CREATE_USER = gql`
  mutation ($username: String!, $email: String!) {
    addUser(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

const SEARCH_USER_BY_EMAIL = gql`
  query ($email: String!) {
    searchUserByEmail(email: $email) {
      id
    }
  }
`;

const SEARCH_USER_BY_USERNAME = gql`
  query ($username: String!) {
    searchUserByUsername(username: $username) {
      id
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

  /**
   * GraphQL
   */
  const { refetch: searchUserByEmail } = useQuery(SEARCH_USER_BY_EMAIL, {
    variables: {
      email: "",
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
  const userExists = useCallback(async (email: string): Promise<boolean> => {
    // Edges case handling
    if (email === null) {
      Promise.reject("No email provided");
    }

    // Search user in db
    const _foundUser = await searchUserByEmail({
      email,
    });

    return _foundUser?.data?.searchUserByEmail ? true : false;
  }, []);

  const usernameExists = useCallback(
    async (username: string): Promise<boolean> => {
      // Edge case handling
      if (username === null) {
        Promise.reject("No username provided");
      }

      // Search username in db
      const _foundUsername = await searchUserByUsername({
        username,
      });

      return _foundUsername?.data?.searchUserByUsername ? true : false;
    },
    []
  );

  /**
   * Create a new user in the database
   * @param {string} id Id of the new user
   */
  const createUser = useCallback(
    async (keys: { email: string; username: string }) => {
      setLoading(true);
      const { email, username } = keys;

      userExists(email).then(async (exists) => {
        if (!exists) {
          // Create user in db
          const created = await _createUser({
            variables: {
              email,
              username,
            },
          });

          setUser(created?.data ?? null);
        } else {
          setUser(null);
        }
      });

      setLoading(false);
    },
    [userExists]
  );

  return { isLoading, user, userExists, usernameExists, createUser };
};
