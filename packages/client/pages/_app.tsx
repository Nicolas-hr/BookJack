import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";

import "../styles/globals.css";
import theme, { sizes } from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "next-auth/client";

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
    <Provider session={pageProps.session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}
