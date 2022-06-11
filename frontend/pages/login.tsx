import type { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export interface IUser {
  [key: string]: string;
}
import styled from "styled-components";
const LoginButton = styled.div`
  display: inline-flex;
  color: black;
  font-weight: 500;
  border-radius: 30px;
  padding: 5px 20px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;
import { isLoggedIn } from "./functions/isLoggedIn";
const Login: NextPage = () => {
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

      <LoginButton
        onClick={() => {
          window.open("http://localhost:8080/login/federated/google", "_self");
        }}
      >
        Login With Google
      </LoginButton>
      <div>{loggedIn.toString()}</div>

      {loggedIn}
    </div>
  );
};

export default Login;
