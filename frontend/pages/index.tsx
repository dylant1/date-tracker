import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Main, Subheader, HeroWrapper } from "../styles/components";

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

const HideOnScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  opacity: 0.6;
  margin-bottom: 150px;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  font-size: 20px;
  font-weight: 500;
  opacity: 0.6;
`;

const CardWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 10px;
  font-size: 15px;
  justify-content: center;
  border: 1px solid grey;
  cursor: pointer;
  &:hover {
    border-color: white;
    transition: 0.5s;
  }
`;
const TimeWrapper = styled.div`
  padding: 5px 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  // width: 110px;
  margin-left: 10px;
`;
const TitleWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
`;

const Home: NextPage = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getVerifiedDates();
    document.addEventListener("scroll", function (e) {
      if (window.scrollY > 500) {
        let scroll = document.getElementById("scroll");
        if (scroll) {
          scroll.classList.add("reduced-opacity");
        }
      }
    });
  }, []);

  const getVerifiedDates = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/dates/verified")
        .then((res: any) => {
          console.log(res.data.rows);
          setPosts(res.data.rows);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderDate = (date: any) => {
    getDaysTill(date);
    if (getDaysTill(date) < 0) {
      return;
    } else if (getDaysTill(date) <= 1) {
      return "<1";
    } else {
      return Math.ceil(getDaysTill(date));
    }
  };
  function getDaysTill(endDate: any) {
    let today = new Date();
    let end = new Date(endDate);
    let difference = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
    console.log(difference);
    return difference;
  }
  return (
    <Main>
      <Navbar />
      <HeroWrapper>
        <Subheader>A forum of upcoming dates.</Subheader>{" "}
      </HeroWrapper>
      <WideWrapper>
        <HideOnScroll id="scroll">
          <div>Scroll Down To See Examples</div>
        </HideOnScroll>
        <DescriptionWrapper>Popular Today</DescriptionWrapper>
        <div>
          {posts.length === 0 && "no Dates"}
          {posts.map((post) => (
            <CardWrapper key={post.id}>
              <TimeWrapper>
                <div>{renderDate(post.date) || "0"}</div>
                <div>days</div>
              </TimeWrapper>{" "}
              <TitleWrapper>{post.title}</TitleWrapper>
            </CardWrapper>
          ))}
        </div>
      </WideWrapper>
    </Main>
  );
};

export default Home;
