import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import BookCardBrowse from "./BookCards/BookCardBrowse";
import IGoogleBook from "../../interfaces/IGoogleBook";

const useStyles = makeStyles((theme) => ({
  browseContainer: {
    marginTop: 25,
  },
}));

const BookBrowseDisplay: React.FC<{
  books: Array<IGoogleBook>;
}> = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={`${classes.browseContainer}`}
      direction="row"
      alignItems="center"
      justify="center"
    >
      {props.books.map((book) => {
        return (
          <Grid key={book.id} item xs={6} md={4} lg={3}>
            <BookCardBrowse title={book.title} cover={book.thumbnail} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BookBrowseDisplay;
