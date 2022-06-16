import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { HeroWrapper } from "../../styles/components";
import DashNavbar from "../components/DashNavbar";
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

const HeroWrapperSmall = styled(HeroWrapper)`
  padding-top: 10px;
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
const ToolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 10px;
`;

const Minus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 12px;
  font-size: 30px;
  border-radius: 50%;
  &:hover {
    background-color: red;
    transition: 0.5s;
  }
  border: 1px solid grey;
  cursor: pointer;
`;
const Home: NextPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [deleted, setDeleted] = useState(0);
  useEffect(() => {
    fetchDates();
  }, []);

  useEffect(() => {
    fetchDates();
  }, [deleted]);
  function getDaysTill(endDate: any) {
    let today = new Date();
    let end = new Date(endDate);
    let difference = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return difference;
  }
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
  const fetchDates = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/dates", { withCredentials: true })
        .then((res: any) => {
          setPosts(res.data.rows);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      setDeleted(deleted + 1);
      const response = await axios
        .delete(`http://localhost:8080/date/${id}`, { withCredentials: true })
        .then((res: any) => {
          console.log("success");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DashNavbar />
      <HeroWrapperSmall>
        {posts.length === 0 && "no Dates"}
        {posts.map((post) => (
          <CardWrapper key={post.id}>
            <TimeWrapper>
              <div>{renderDate(post.date) || "0"}</div>
              <div>days</div>
            </TimeWrapper>{" "}
            <TitleWrapper>{post.title}</TitleWrapper>
            <ToolWrapper>
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
            </ToolWrapper>
          </CardWrapper>
        ))}
      </HeroWrapperSmall>
    </div>
  );
};

export default Home;
