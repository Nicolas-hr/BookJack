import React from "react";
import { AuthConfig } from "react-use-auth";
import { Auth0 } from "react-use-auth/auth0";
import { useRouter } from "next/router";

import "../styles/globals.css";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
