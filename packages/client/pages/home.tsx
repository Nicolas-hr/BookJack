import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";
import { makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withProtect } from "../hoc/RouteProtection";

const useStyles = makeStyles((theme) => ({}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth();

  return (
    <React.Fragment>
      <Navbar />
      Home
      <Footer />
    </React.Fragment>
  );
};

export default Home;
