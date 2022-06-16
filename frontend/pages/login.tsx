import type { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import { HeroWrapper } from "../styles/components";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import GoogleLogo from "../public/assets/GoogleSVG";
import isLoggedIn from "./functions/isLoggedIn";

const Form = styled.form`
display: flex;
flex-direction: column;
  justify-content: center;
  align-items; center;
  text-align: center;
  margin: auto;
`;
const Input = styled.input`
  background: none;
  outline: 0;
  border: 0;

  border-bottom: 2px solid #4b4b4c;
  color: white;
  margin-top: 25px;
  width: fit-content;
  font-size: 1.6rem;
`;
const Or = styled.div`
  font-size: 1.4rem;
  color: white;
  opacity: 0.6;
  margin-top: 20px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 300px;
  padding: 5px 20px;
  border-radius: 5px;
  background: none;
  color: white;
  border: 1px solid #4b4b4c;
  font-weight: 500;
  font-size: 1.3rem;
  &:hover {
    border-color: #007fff;
    color: #007fff;
  }
  cursor: pointer;
`;
const Submit = styled.input`
  margin-top: 25px;
  padding: 5px 20px;
  font-size: 1.3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Wrapper = styled(HeroWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 25px;
`;
export interface IUser {
  [key: string]: string;
}
const Login: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [googleColor, setGoogleColor] = useState("white");
  useEffect(() => {
    isLoggedIn()
      .then((res: any) => {
        setLoggedIn(res.data);
      })
      .catch((err: any) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <Wrapper>
        <Button
          onClick={() => {
            window.open(
              "http://localhost:8080/login/federated/google",
              "_self"
            );
          }}
          onMouseEnter={() => {
            setGoogleColor("#007FFF");
          }}
          onMouseLeave={() => {
            setGoogleColor("white");
          }}
        >
          <div
            style={{
              display: "flex",
              paddingRight: "15px",
            }}
          >
            <GoogleLogo fill={googleColor} />
          </div>
          <div>Log In With Google</div>
        </Button>
        <Or>or</Or>
        <Form>
          <div>
            <Input type="text" placeholder="email" />
          </div>
          <div>
            <Input type="text" placeholder="password" />
          </div>

          <div>
            <Submit type="submit" />
          </div>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Login;
