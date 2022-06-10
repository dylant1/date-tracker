import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import Typewriter from "typewriter-effect";

import styled from "styled-components";
import {
  Main,
  Header,
  Subheader,
  HeroWrapper,
  NavbarWrapper,
} from "../styles/components";
const Home: NextPage = () => {
  let keyword = "Birthday";
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
        <Subheader>A Forum of Important</Subheader>{" "}
        <button className="get-started">test button</button>
      </HeroWrapper>
    </Main>
  );
};

export default Home;
