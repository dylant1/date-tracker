import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home: NextPage = () => {
  const [formShown, setFormShown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00");
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetchDates();
    console.log(posts);
  }, []);

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
  useEffect(() => {
    console.log(date);
  }, [date]);
  useEffect(() => {
    console.log(time);
  }, [time]);
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
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
