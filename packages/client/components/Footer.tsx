import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { palette } from "../theme";
import { signIn } from "next-auth/client";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: palette.darkBlue,
    padding: "55px 0",
    height: "600px",
    gap: "30px",

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
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
    },
  },
  copyright: {
    textAlign: "center",
    fontSize: "16px",
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
              {
                screen_hint: "signup",
              }
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
