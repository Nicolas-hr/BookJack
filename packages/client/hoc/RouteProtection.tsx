import React from "react";
import { useAuth } from "react-use-auth";
import Error from "next/error";

export const withProtect = (Component: React.FC) => (props: {}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    window.location.replace(window.location.origin);
    return <Error statusCode={401} title="Not authorized" />;
  }

  return <Component {...props} />;
};
