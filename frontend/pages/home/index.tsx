import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
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
const CardContainer = styled.div`
  background-color: white;
  display: flex;
  max-width: 900px;
  flex-direction: column;
  justify-content: center;
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
const Plus = styled.div`
  background-color: red;
  padding: 0 5px;
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
  const [formShown, setFormShown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00");
  const [posts, setPosts] = useState<any[]>([]);
  const [deleted, setDeleted] = useState(0);
  useEffect(() => {
    fetchDates();
    console.log(posts);
  }, []);
  useEffect(() => {
    fetchDates();
  }, [deleted]);
  function getDaysTill(endDate: any) {
    let today = new Date();
    let end = new Date(endDate);
    let difference = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
    console.log(difference);
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
          console.log(res.data.rows);
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/create/date",
        data: {
          user_id: 5,
          date_created: new Date(),
          date: date,
          time: time,
          title: title,
          description: description,
          hidden: "false",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchDates();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <DashNavbar />
      Home page, MAKE SURE TO ADD CREDENTIALS TO HEADER
      <button
        onClick={() => {
          setFormShown(true);
        }}
      >
        click to add a post
      </button>
      show a form here{" "}
      {formShown && (
        <form onSubmit={handleSubmit}>
          <div>
            <DatePicker
              selected={date}
              onChange={(date: any) => setDate(date)}
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      )}
      <HeroWrapperSmall>
        {posts.map((post) => (
          <CardWrapper key={post.id}>
            <TimeWrapper>
              <div>{renderDate(post.date) || "0"}</div>
              <div>days</div>
            </TimeWrapper>{" "}
            <TitleWrapper>{post.title}</TitleWrapper>
            {/* <div>{post.date}</div> */}
            {/* {post.title} */}
            <ToolWrapper>
              {/* <Plus>+</Plus> */}
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
