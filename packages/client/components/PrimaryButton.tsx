import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { MouseEventHandler } from "react";
import { palette, sizes } from "../theme";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: sizes.button.borderRadius,
    backgroundColor: palette.blue,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1.25rem",
    boxShadow: sizes.button.boxShadow,

    "&:focus": {
      backgroundColor: palette.blue,
    },
  },
}));

const PrimaryButton: React.FC<{
  title?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={`${classes.button} ${props.className}`}
      variant="contained"
      size="large"
      color="primary"
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

export default PrimaryButton;
