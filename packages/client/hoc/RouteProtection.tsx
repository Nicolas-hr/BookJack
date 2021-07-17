import React from "react";
import { useAuth } from "react-use-auth";

/**
 * Force the user to be logged to see the given content
 *
 * @param Component Component to render after middleware passed
 * @returns
 */
export const asLoggedRequired =
  (Component: React.FunctionComponent) => (props: {}) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
      return <Component {...props} />;
    } else {
      window.location.replace("/");
      return <React.Fragment></React.Fragment>;
    }
  };

/**
 * Force the user to NOT be logged (as lambda user) to see the given content
 *
 * @param Component Component to render after middleware passed
 * @returns
 */
export const asLambdaRequired =
  (Component: React.FunctionComponent) => (props: {}) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
      window.location.replace("/");
      return <React.Fragment></React.Fragment>;
    } else {
      return <Component {...props} />;
    }
  };
