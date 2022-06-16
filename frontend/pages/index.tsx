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
import axios from "axios";
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
const HideOnScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  opacity: 0.6;
  margin-bottom: 150px;
  text-align: center;
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
const Down = styled.div``;
const TitleWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
`;

function displayDifference(difference: any) {
  return <BigTimeWrapper></BigTimeWrapper>;
}

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
        {/* <Header>
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
        </Header> */}
        <Subheader>A forum of upcoming dates.</Subheader>{" "}
        {/* <ButtonWrapper>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </ButtonWrapper> */}
      </HeroWrapper>
      <WideWrapper>
        <HideOnScroll id="scroll">
          <div style={{}}>Scroll Down To See Examples</div>
          <div style={{}}>
            <Down></Down>
          </div>
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
              {/* <div>{post.date}</div> */}
              {/* {post.title} */}
              {/* <ToolWrapper>
                <Plus>+</Plus>
                <Minus
                  onClick={() => {
                    handleDelete(post.id);
                  }}
                >
                  <span
                    style={{
                      paddingBottom: "2px",
                    }}
                  >
                    -
                  </span>
                </Minus>
              </ToolWrapper> */}
            </CardWrapper>
          ))}
        </div>
      </WideWrapper>
    </Main>
  );
};

export default Home;
