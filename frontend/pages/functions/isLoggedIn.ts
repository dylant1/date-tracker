import axios from "axios";
const isLoggedIn = async () => {
  let loggedIn = await axios
    .get("http://localhost:8080/isLoggedIn", { withCredentials: true })
    .then((res: any) => {
      return res;
    })
    .catch((err) => console.log(err));
  return loggedIn;
};

export default isLoggedIn;
