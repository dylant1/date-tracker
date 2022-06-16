import { NextPage } from "next";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import DashNavbar from "../components/DashNavbar";
import axios from "axios";
import { HeroWrapper } from "../../styles/components";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useRouter } from "next/router";

const Title = styled.div`
  font-size: 30px;
  opacity: 0.6;
  margin-bottom: 50px;
`;
const Wrapper = styled(HeroWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 0;
  padding: calc(40vh - 400px) 22px;
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
  text-align: center;
`;

const TextArea = styled.textarea`
  background: none;
  outline: 0;
  border: 0;

  border: 2px solid #4b4b4c;
  color: white;
  margin-top: 25px;
  width: fit-content;
  font-size: 1.6rem;
  text-align: center;
  resize: none;
  font-family: "Inter", sans-serif;
`;

const Submit = styled.input`
  margin-top: 25px;
  padding: 5px 20px;
  font-size: 1.3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Create: NextPage = () => {
  const [date, setDate] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00");
  const [userId, setUserId] = useState<any>(null);

  const router = useRouter();
  useEffect(() => {
    getUserId();
  }, []);
  async function getUserId() {
    try {
      let response = await axios
        .get("http://localhost:8080/user", {
          withCredentials: true,
        })
        .then((res: any) => {
          setUserId(res.data.rows[0].id);
        });
    } catch (err) {
      console.log(err);
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/create/date",
        data: {
          user_id: userId,
          date_created: new Date(),
          date: date,
          time: time,
          title: title,
          description: description,
          hidden: "false",
          verified: "FALSE",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/home/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <DashNavbar />
      <Wrapper>
        <Title>Create Date</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <DatePicker
              placeholderText={"Date of Event"}
              selected={date}
              onChange={(date: any) => setDate(date)}
              wrapperClassName="date-input"
            />
          </div>
          <div>
            <Input
              type="text"
              name="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            />
          </div>
          <div>
            <TextArea
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              rows={5}
            />
          </div>
          <Submit type="submit" value="Create" />
        </form>
      </Wrapper>
    </div>
  );
};

export default Create;
