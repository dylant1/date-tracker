import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { intervalToDuration, differenceInCalendarDays } from "date-fns";

import {
  Main,
  Header,
  Subheader,
  HeroWrapper,
  NavbarWrapper,
} from "../styles/components";
const Button = styled.a`
  border: none;
  cursor: pointer;
  color: #fff;
  background: #ff8c22;
  line-height: 1.5em;
  text-decoration: none;
  display: inline-block;
  padding: 0.7em 1.4em;
  font-weight: 600;
  font-size: 18px;
  border-radius: 7px;
  text-align: center;
  &:hover {
    background: #ff7f21;
  }
`;
const WideWrapper = styled.div`
  max-width: 1180px;
  // padding: calc(50vh - 400px) 22px;
  margin: 50px auto;
  height: auto;
  text-align: center;
  display: block;
  overflow: hidden;
  @media (max-width: 1180px) {
    max-width: 800px;
  }
`;
const TimeHeader = styled.div`
  font-weight: bold;
  font-size: 90px;
  margin: 0;
  padding: 0;
  margin-bottom: -10px;
  color: white;
`;
const SubTimeHeader = styled.span`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const BigTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #a9a9a9;
  animation: fadeInAnimation ease 6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const DescriptionWrapper = styled.div`
  font-size: 60px;
  font-weight: 500;
`;
const SmallTimeWrapper = styled.div``;
const Divider = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;
const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

function displayDifference(difference: any) {
  return <BigTimeWrapper></BigTimeWrapper>;
}

const Home: NextPage = () => {
  return (
    <Main>
      {" "}
      <Navbar />
      <HeroWrapper>
        <Header>
          <span>An Easy Way to Remember</span>
          <br />{" "}
          <span className="infinite-color">
            <Typewriter
              options={{
                strings: ["Birthdays", "Events", "Holidays"],
                autoStart: true,
                loop: true,
                cursor: "_",
                deleteSpeed: 50,
              }}
            />
          </span>
        </Header>
        <Subheader>A Forum of Upcoming Dates</Subheader>{" "}
        <ButtonWrapper>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </ButtonWrapper>
      </HeroWrapper>
      <WideWrapper>
        {/* {displayDifference(difference)} */}
        {/* <SmallTimeWrapper>
          Small time here{date.toLocaleTimeString()}
        </SmallTimeWrapper> */}
        <DescriptionWrapper>Until Christmas</DescriptionWrapper>
      </WideWrapper>
    </Main>
  );
};

export default Home;
