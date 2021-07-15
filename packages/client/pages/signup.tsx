import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "react-use-auth";
import { useUser } from "../custom-hooks/useUser";

const Home = () => {
  const { user } = useAuth();
  const { createUser } = useUser();

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
