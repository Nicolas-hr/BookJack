import { useEffect } from "react";
import { useAuth } from "react-use-auth";

/**
 * Callback page for the auth0 authentcation page
 * @returns React element
 */
const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth();

  // Redirect the user after login to check his status
  useEffect(() => {
    handleAuthentication({ postLoginRoute: "/check-user-status" });
  }, [handleAuthentication]);

  return (
    <h1>
      This is the auth callback page, you should be redirected immediately!
    </h1>
  );
};

export default Auth0CallbackPage;
