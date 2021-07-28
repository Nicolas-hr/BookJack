import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: ['"Montserrat"', "Open Sans"].join(","),
  },
});

export const sizes = {
  root: {
    padding: "0 38px",
    paddingBottom: "80px",
  },
  navbar: {
    height: "110px",
    paddingLeft: "38px",
    paddingRight: "38px",
  },
  drawer: {
    padding: "3px 38px",
  },
  app: {
    padding: "3px 38px",
    paddingLeft: "38px",
  },
  button: {
    borderRadius: "30px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)",
  },
  input: {
    borderRadius: "14px",
  },
};

export const palette = {
  white: "#FFFFFF",
  blue: "#9BAAF2",
  darkBlue: "#1A223B",
  textLight: "#C6D0EB",
  textDark: "#1A223B",
  title: "#205284",
};

export default theme;
