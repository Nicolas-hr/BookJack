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
  navbar: {
    height: "150px",
    paddingLeft: "38px",
    paddingRight: "38px",
  },
  drawer: {
    padding: "3px 38px",
  },
  app: {
    padding: "3px 38px",
  },
  button: {
    borderRadius: "30px",
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
};

export default theme;
