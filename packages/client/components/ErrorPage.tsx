import React from "react";
import { useSession } from "next-auth/client";
import Navbar, { LambdaNavbar } from "./Navbar";

const ErrorPage: React.FC<{
  statusCode: number;
  title: string;
}> = (props) => {
  const [session] = useSession();

  return (
    <React.Fragment>
      {session && <Navbar />} {!session && <LambdaNavbar />}
      <h1>{props.statusCode}</h1>
      <p>{props.title}</p>
    </React.Fragment>
  );
};

export default ErrorPage;
