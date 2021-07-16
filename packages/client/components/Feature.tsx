import React, { ReactNode } from "react";
import { makeStyles, StandardProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& h3": {
      fontSize: "30px",
      width: "100%",
    },
    "& div": {
      fontSize: "18px",
      width: "100%",
    },
    "&:nth-child(odd) h3, &:nth-child(odd) div": {
      textAlign: "left",
    },
    "&:nth-child(even) h3, &:nth-child(even) div": {
      textAlign: "right",
    },
    "& img": {
      width: "70%",
    },
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
      {props.children}
    </div>
  );
};

export default Feature;
