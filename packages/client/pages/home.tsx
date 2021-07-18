import React from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withProtect } from "../hoc/RouteProtection";
import { useSession } from "next-auth/client";

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
