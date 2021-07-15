import { makeStyles } from "@material-ui/core";
import { sizes, palette } from "../../theme";
import Link from "@material-ui/core/Link";
import React, { MouseEventHandler } from "react";

const useStyles = makeStyles((theme) => ({
  drawerElement: {
    padding: sizes.drawer.padding,
    backgroundColor: palette.darkBlue,
    color: palette.textLight,
    fontSize: "20px",
    fontWeight: 400,
    cursor: "pointer",

    "&:hover": {
      textDecoration: "none",
    },
  },
  logged: {
    backgroundColor: palette.white,
    color: palette.textDark,
  },
  notLogged: {
    backgroundColor: palette.darkBlue,
    color: palette.textLight,
  },
}));

const DrawerLink: React.FC<{
  href?: string;
  children?: string | JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  logged: boolean;
}> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <Link
      href={props.href}
      className={`${classes.drawerElement} ${
        props.logged ? classes.logged : classes.notLogged
      } ${props.className}`}
      onClick={(event) => props.onClick(event)}
    >
      {props.children}
    </Link>
  );
};

export default DrawerLink;
