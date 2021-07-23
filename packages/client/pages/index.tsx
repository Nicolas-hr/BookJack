import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { LambdaNavbar } from "../components/Navbar";
import PrimaryButton from "../components/PrimaryButton";
import { palette, sizes } from "../theme";

const useStyles = makeStyles((theme) => ({
  accent: {
    color: palette.blue,
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    backgroundColor: palette.darkBlue,
    padding: sizes.root.padding,
    paddingBottom: sizes.root.paddingBottom,
    color: palette.white,
    fontWeight: 200,
    fontSize: "16px",
  },
  headerInput: {
    color: "rgba(#205284, .5)",
    fontWeight: 600,
    fontSize: "18px",
    backgroundColor: "white",
    borderRadius: 14,
  },
  search: {
    position: "absolute",
    bottom: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
  },
  body: {
    padding: sizes.root.padding,
    paddingTop: "70px",
    paddingBottom: "70px",
  },
  sectionTitle: {
    position: "relative",
    textAlign: "center",
    textTransform: "uppercase",

    "&&&:after": {
      content: "''",
      position: "absolute",
      width: "90px",
      height: "5px",
      backgroundColor: palette.blue,
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  features: {
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
    gap: "70px",
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <LambdaNavbar />

      <Hero>
        Have a <br />
        <span className={classes.accent}>Book List</span> To
        <br />
        <span className={classes.accent}>Feel at Ease</span> !
      </Hero>

      <header className={classes.header}>
        Keep track of all your books and do not worry to remember all of them.
        Create notes and custom list to create new memories.
        <TextField
          variant="outlined"
          size="small"
          placeholder="Book name"
          inputProps={{
            className: classes.headerInput,
          }}
        ></TextField>
        <PrimaryButton title="Search book" className={classes.search} />
      </header>

      <main className={classes.body}>
        <h1 className={classes.sectionTitle}>
          Know about
          <br /> our features
        </h1>

        <div className={classes.features}>
          <Feature
            illustration={"/women-on-books.svg"}
            title="Add book to a list"
          >
            Add books to your lists to keep track of them.
            <br />
            Best way to remember books that you read.
          </Feature>

          <Feature illustration={"/rating.svg"} title="Rate your reading">
            The rating system allow you to sort the books that you read to make
            more accurate suggestion to friends.
          </Feature>

          <Feature
            illustration={"/guy-pinning-stuff.svg"}
            title="Add notes to your reading"
          >
            Adding notes help you remember the way you felt after reading the
            the books.
          </Feature>

          <Feature
            illustration={"/guy-with-stats.svg"}
            title="Personal stats for your lists"
          >
            The statistics will help you figuring out what kind of genre you
            like and how uch you love reading. You will be able to find the good
            books for you.
          </Feature>

          <Feature illustration={"/womens.svg"} title="Follow your friends">
            The community side of the website is one of the best way to motivate
            you to read and discover new books.
          </Feature>

          <Feature illustration={"/feed.svg"} title="Community feed">
            The home feed make the community more alive and is the best way to
            create more friends on the site.
          </Feature>
        </div>
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
