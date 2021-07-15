import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "react-use-auth";

const Home = () => {
  const { isAuthenticated, user, login, signup, logout } = useAuth();

  return (
    <div>
      <Navbar />
      Hey !
    </div>
  );
};

export default Home;
