import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import { palette, sizes } from "../theme";

const useStyles = makeStyles((theme) => ({
  hero: {
    width: "100%",
    position: "relative",
    padding: sizes.app.padding,
    paddingTop: "20px",
    paddingBottom: "50px",
    backgroundColor: palette.darkBlue,
    fontSize: "3rem",
    fontWeight: 700,
    color: "#fff",

    "& img": {
      position: "absolute",
      top: "100%",
      left: 0,
    },
  },
}));

const Hero: React.FC<{ children?: string | ReactNode; waves?: boolean }> = (
  props
) => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      {props.children} {props.waves && <img src={"/wave.svg"} />}
    </div>
  );
};

export default Hero;
