import axios from "axios";
const getUser = async () => {
  let user = await axios
    .get("http://localhost:8080/user", { withCredentials: true })
    .then((res: any) => {
      console.log(res.data.rows[0]);

      return res.data.rows[0];
    });
  console.log(user);

  return user;
};
export default getUser;
