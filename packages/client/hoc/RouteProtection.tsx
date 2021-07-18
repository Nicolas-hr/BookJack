import React from "react";
import { useSession } from "next-auth/client";
import ErrorPage from "../components/ErrorPage";

export const withProtect = (Component: React.FC) => (props: {}) => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session) {
    return <ErrorPage statusCode={401} title="Not authorized" />;
  }

  return <Component {...props} />;
};
