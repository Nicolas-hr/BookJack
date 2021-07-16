import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { HamburgerSqueeze } from "react-animated-burgers";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "react-use-auth";
import { sizes, palette } from "../theme";
import DrawerLink from "./Drawer/DrawerLink";
import DrawerDelimiter from "./Drawer/DrawerDelimiter";
import { useUser } from "../custom-hooks/useUser";

/**
 * Style of the navbar
 */
const useStyles = makeStyles((theme) => ({
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
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { userExists } = useUser();
  const [exists, setUserExists] = useState<boolean>();

  // Check if user exists in our db
  useEffect(() => {
    if (user) {
      userExists({ id: user.sub }).then((exists) => {
        setUserExists(exists);
      });
    }
  }, [user]);

  const fullLogged = isAuthenticated() && exists;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0} position="relative">
        <Toolbar
          className={`${classes.navbar} ${
            fullLogged ? classes.login : classes.logout
          }`}
        >
          <Link className={classes.brand}>
            <img
              className={classes.logo}
              src={fullLogged ? "/logo-large.svg" : "/logo-small.svg"}
              alt="Logo large"
            />
          </Link>

          {!isAuthenticated() && (
            <div>
              <div className={classes.inline}>
                <Button onClick={() => signup()} className={classes.signup}>
                  Sign up
                </Button>
              </div>
            </div>
          )}

          <HamburgerSqueeze
            isActive={open}
            toggleButton={() => toggleDrawer()}
            buttonWidth={36}
            barColor={fullLogged ? palette.darkBlue : palette.textLight}
          />
          <Drawer
            anchor="top"
            open={open}
            onClose={() => toggleDrawer()}
            BackdropProps={{ invisible: true }}
          >
            <div className={classes.drawerSpacer}></div>
            <DrawerLink logged={fullLogged} href="/">
              Home
            </DrawerLink>

            {isAuthenticated() ? (
              <React.Fragment>
                {exists && (
                  <React.Fragment>
                    <DrawerLink logged={true} href={`/user/${user.sub}`}>
                      Profile
                    </DrawerLink>
                  </React.Fragment>
                )}

                <DrawerDelimiter logged={exists}></DrawerDelimiter>

                <DrawerLink
                  className={classes.drawerLast}
                  logged={exists}
                  onClick={() => logout()}
                >
                  Log out
                </DrawerLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DrawerDelimiter logged={false}></DrawerDelimiter>

                <DrawerLink
                  className={classes.drawerLast}
                  logged={false}
                  onClick={() => login()}
                >
                  Log in
                </DrawerLink>
              </React.Fragment>
            )}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
