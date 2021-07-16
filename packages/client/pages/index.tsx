import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "react-use-auth";
import { useUser } from "../custom-hooks/useUser";

const Home = () => {
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const { userExists } = useUser();

  // Edge case handling if a `logout` hasn't work and the user as been redirected
  // at the home page without having completed the sign up process.
  useEffect(() => {
    if (isAuthenticated()) {
      userExists({ id: user.sub }).then((exists) => {
        if (!exists) {
          logout();
        }
      });
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      Hey !
    </div>
  );
};

export default Home;
