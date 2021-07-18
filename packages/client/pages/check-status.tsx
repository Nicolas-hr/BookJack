import React, { useEffect } from "react";
import { options, signIn, signOut, useSession } from "next-auth/client";
import { useUser } from "../custom-hooks/useUser";

/**
 * Check the user status. Is the user in our db or not.
 * @returns React element
 */
const UserStatusCheck = () => {
  const { userExists } = useUser();
  const [session, loading] = useSession();

  // Check if user exists in our db after fetching auth0's user
  useEffect(() => {
    if (session) {
      userExists(session.user.email).then((result) => {
        if (result) {
          window.location.replace("/home");
        } else {
          window.location.replace("/signup");
        }
      });
    }
  }, [session]);

  return (
    <React.Fragment>
      <h1>Checking user informations...</h1>
    </React.Fragment>
  );
};

export default UserStatusCheck;
