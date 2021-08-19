import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { palette, sizes } from "../../../theme";

const useStyles = makeStyles((theme) => ({
  bookCardBrowseCover: {
    borderRadius: sizes.cover.borderRadius,
  },
  bookCardBrowseText: {
    color: palette.inputStrokeDark,
    fontSize: "0.875rem",
    textAlign: "center",
  },
}));

const BookCardBrowse: React.FC<{
  title: string;
  cover: string;
}> = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      justify="space-around"
      direction="column"
    >
      <img
        src={`${props.cover}`}
        className={`${classes.bookCardBrowseCover}`}
        alt="book cover"
      />
      <p className={`${classes.bookCardBrowseText}`}>{props.title}</p>
    </Grid>
  );
};

export default BookCardBrowse;
