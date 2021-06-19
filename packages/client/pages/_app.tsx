import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthConfig } from "react-use-auth";
import { Auth0 } from "react-use-auth/auth0";
import { useRouter } from "next/router";

import "../styles/globals.css";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";

// Apollo client to make graphql call programmaticaly
const apolloClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle server/client side mismatch
    setHasMounted(true);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Show nothing if not mounted
  if (!hasMounted) return null;

  return (
    <React.Fragment>
      <AuthConfig
        authProvider={Auth0}
        navigate={(url: string) => router.push(url)}
        params={{
          domain: "bookjack.eu.auth0.com",
          clientID: "AC9rC9cDz7fn4JuKhhfQJQDc9HCrGax6",
        }}
      />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
