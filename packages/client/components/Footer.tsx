import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "next-auth/client";
import React from "react";
import { palette } from "../theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: palette.darkBlue,
    padding: "55px 0",
    height: "400px",
    gap: "35px",

    "& img": {
      width: "50%",
    },
  },
  spacer: {
    flexGrow: 1,
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    "& a": {
      color: palette.white,
      fontSize: "1.25rem",
      fontWeight: "600",
      textAlign: "center",
    },
  },
  copyright: {
    textAlign: "center",
    fontSize: "1rem",
    color: palette.white,
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={"/logo-large.svg"} alt="" />

      <div className={classes.spacer}></div>

      <div className={classes.links}>
        <Link href="/">Home</Link>

        <Link
          onClick={() =>
            signIn(null, {
              callbackUrl: `${window.location.origin}/check-status`,
            })
          }
        >
          Log in
        </Link>
        <Link
          onClick={() =>
            signIn(
              "auth0",
              { callbackUrl: `${window.location.origin}/check-status` },
              { screen_hint: "signup" }
            )
          }
        >
          Sign up
        </Link>
      </div>

      <div className={classes.copyright}>
        @2021 BookJack
        <br />
        Made by M. Cavagna & M. Hoarau
      </div>
    </div>
  );
};

export default Footer;
