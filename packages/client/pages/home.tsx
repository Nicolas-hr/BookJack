import { makeStyles } from "@material-ui/core";
import { useSession } from "next-auth/client";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { withProtect } from "../hoc/RouteProtection";

const useStyles = makeStyles((theme) => ({}));

const Home: React.FC = () => {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <React.Fragment>
      <Navbar />
      {session?.user.email}
      <Footer />
    </React.Fragment>
  );
};

export default withProtect(Home);
