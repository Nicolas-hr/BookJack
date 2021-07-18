import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { HamburgerSqueeze } from "react-animated-burgers";
import { makeStyles } from "@material-ui/core";
import { sizes, palette } from "../theme";
import DrawerLink from "./Drawer/DrawerLink";
import DrawerDelimiter from "./Drawer/DrawerDelimiter";
import { signIn, signOut, useSession } from "next-auth/client";

/**
 * Style of the navbar
 */
const useStyles = makeStyles(() => ({
  brand: {
    flexGrow: 1,
  },
  inline: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  appbar: {
    zIndex: 1301, // Default z-index of Drawer is 1300
  },
  logout: {
    backgroundColor: palette.darkBlue,
  },
  login: {
    backgroundColor: palette.white,
  },
  navbar: {
    height: sizes.navbar.height,
    paddingLeft: sizes.navbar.paddingLeft,
    paddingRight: sizes.navbar.paddingRight,
  },
  logo: {
    height: "50px",
  },
  // Used to pad top the drawer' elements to be under the navbar
  drawerSpacer: {
    height: sizes.navbar.height,
  },
  // Add a bit of space under last drawer element
  drawerLast: {
    paddingBottom: "15px",
  },
  signup: {
    color: palette.white,
    backgroundColor: palette.blue,
    textTransform: "none",
    height: "25px",
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [session, loading] = useSession();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0} position="relative">
        <Toolbar className={`${classes.navbar} ${classes.login}`}>
          <Link className={classes.brand}>
            <img
              className={classes.logo}
              src={"/logo-large.svg"}
              alt="Logo large"
            />
          </Link>

          <HamburgerSqueeze
            isActive={open}
            toggleButton={() => toggleDrawer()}
            buttonWidth={36}
            barColor={palette.darkBlue}
          />
          <Drawer
            anchor="top"
            open={open}
            onClose={() => toggleDrawer()}
            BackdropProps={{ invisible: true }}
          >
            <div className={classes.drawerSpacer}></div>
            <DrawerLink logged={true} href={window.location.origin}>
              Home
            </DrawerLink>

            <React.Fragment>
              <DrawerLink logged={true} href={`/user/`}>
                Profile
              </DrawerLink>
            </React.Fragment>

            <DrawerDelimiter logged={true}></DrawerDelimiter>

            <DrawerLink
              className={classes.drawerLast}
              logged={true}
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/api/auth/logout`,
                })
              }
            >
              Log out
            </DrawerLink>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const LambdaNavbar: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar className={classes.appbar} elevation={0} position="relative">
      <Toolbar className={`${classes.navbar} ${classes.logout}`}>
        <Link className={classes.brand}>
          <img
            className={classes.logo}
            src={"/logo-small.svg"}
            alt="Logo large"
          />
        </Link>

        <div className={classes.inline}>
          <Button
            onClick={() =>
              signIn(
                "auth0",
                { callbackUrl: `${window.location.origin}/check-status` },
                {
                  screen_hint: "signup",
                }
              )
            }
            className={classes.signup}
          >
            Sign up
          </Button>
        </div>

        <HamburgerSqueeze
          isActive={open}
          toggleButton={() => toggleDrawer()}
          buttonWidth={36}
          barColor={palette.textLight}
        />
        <Drawer
          anchor="top"
          open={open}
          onClose={() => toggleDrawer()}
          BackdropProps={{ invisible: true }}
        >
          <div className={classes.drawerSpacer}></div>

          <DrawerLink logged={false} href={window.location.origin}>
            Home
          </DrawerLink>

          <DrawerDelimiter logged={false}></DrawerDelimiter>

          <DrawerLink
            className={classes.drawerLast}
            logged={false}
            onClick={() =>
              signIn(null, {
                callbackUrl: `${window.location.origin}/check-status`,
              })
            }
          >
            Log in
          </DrawerLink>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
