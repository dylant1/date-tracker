import type { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
export interface IUser {
  [key: string]: string;
}
import { isLoggedIn } from "./functions/isLoggedIn";
const Signup: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    isLoggedIn()
      .then((res: any) => {
        setLoggedIn(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <button
        onClick={() => {
          window.open("http://localhost:8080/login/federated/google", "_self");
        }}
      >
        Login With Google
      </button>
      <div>{loggedIn.toString()}</div>

      {loggedIn}
    </div>
  );
};

export default Signup;
