import { NextPage } from "next";
import DatePicker from "react-datepicker";
import { useState } from "react";
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
const Or = styled.div`
  font-size: 1.4rem;
  color: white;
  opacity: 0.6;
  margin-top: 20px;
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
const Create: NextPage = () => {
  const [formShown, setFormShown] = useState(false);
  const [date, setDate] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00");
  const [posts, setPosts] = useState<any[]>([]);
  const [deleted, setDeleted] = useState(0);
  const router = useRouter();

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
          verified: "TRUE",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/home/");
      //   fetchDates();
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
