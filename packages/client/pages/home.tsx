import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";
import { makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";
import { sizes, palette } from "../theme";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({}));

const Home = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.replace("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      <Navbar />
      Home
      <Footer />
    </React.Fragment>
  );
};

export default Home;
