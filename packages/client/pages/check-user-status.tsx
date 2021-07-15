import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";
import { useUser } from "../custom-hooks/useUser";

/**
 * Check the user status. Is the user in our db or not.
 * @returns React element
 */
const UserStatusCheck = () => {
  const { user } = useAuth();
  const { exists, userExists, createUser } = useUser();

  // Check if user exists in our db after fetching auth0's user
  useEffect(() => {
    if (user) {
      userExists(user.sub);
    }
  }, [user]);

  // Handle user existance
  useEffect(() => {
    if (exists) {
      window.location.replace("/");
    } else {
      window.location.replace("/signup");
    }
  }, [exists]);

  return (
    <React.Fragment>
      <h1>Checking user informations...</h1>
    </React.Fragment>
  );
};

export default UserStatusCheck;
