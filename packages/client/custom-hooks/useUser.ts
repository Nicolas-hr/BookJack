import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import { useCallback, useState } from "react";

/**
 * GraphQL queries
 */
const CREATE_USER = gql`
  mutation ($id: String!) {
    addUser(id: $id) {
      userId
    }
  }
`;

const SEARCH_USER = gql`
  query ($id: String!) {
    searchUser(id: $id) {
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
  const { refetch: searchUser } = useQuery(SEARCH_USER, {
    variables: {
      id: "",
    },
  });
  const [_createUser, { data: createdUser }] = useMutation(CREATE_USER);

  /**
   * Does a use exists
   * @param {string} id Id of the checked user
   */
  const userExists = useCallback(async (id: string = null) => {
    setLoading(true);

    // Edges case handling
    if (id === null) {
      setUserExists(false);
      setUser(null);
      setLoading(false);
      return;
    }

    // Search user in db
    const _foundUser = await searchUser({
      id,
    });

    setUserExists(_foundUser?.data?.searchUser ? true : false);
    setUser(_foundUser?.data?.searchUser ?? null);
    setLoading(false);
  }, []);

  /**
   * Create a new user in the database
   * @param {string} id Id of the new user
   */
  const createUser = useCallback(async (id: string = null) => {
    setLoading(true);

    // Edge case handling
    if (id === null) {
      setUser(null);
      setLoading(false);
    }

    // Create user in db
    const created = await _createUser({
      variables: {
        id,
      },
    });

    setUser(created?.data ?? null);
    setLoading(false);
  }, []);

  return { isLoading, exists, user, userExists, createUser };
};
