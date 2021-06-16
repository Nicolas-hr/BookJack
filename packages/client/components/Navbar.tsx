import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "react-use-auth";

const useStyles = makeStyles((theme) => ({
  brand: {
    flexGrow: 1,
  },
  logo: {
    height: "50px",
  },
  inline: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { isAuthenticated, user, login, signup, logout } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.brand}>
            <img
              className={classes.logo}
              src={"/logo-large.svg"}
              alt="Logo large"
            />
          </Link>

          <div className={classes.inline}>
            <Button onClick={() => login()}>Login</Button>
            <Button onClick={() => signup()}>Singin</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
