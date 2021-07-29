import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& h3": {
      fontSize: "1.875rem",
      width: "100%",
    },
    "& p": {
      fontSize: "1.125rem",
      width: "100%",
    },
    "&:nth-child(odd) h3, &:nth-child(odd) p": {
      textAlign: "left",
    },
    "&:nth-child(even) h3, &:nth-child(even) p": {
      textAlign: "right",
    },
    "& img": {
      width: "70%",
    },
  },
  paragraph: {
    margin: 0,
  },
}));

const Feature: React.FC<{
  children?: string | ReactNode;
  illustration?: string;
  title?: string;
}> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.feature}>
      <img src={props.illustration} alt="" />
      <h3>{props.title}</h3>
      <p className={classes.paragraph}>{props.children}</p>
    </div>
  );
};

export default Feature;
