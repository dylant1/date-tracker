import type { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";

const Login: NextPage = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    // axios.get("http://localhost:8080/isloggedin").then((res: any) => {
    //   console.log(res.user || "Undefined res user");
    //   // setName(res);
    // });
    axios
      .get("http://localhost:8080/user", { withCredentials: true })
      .then((res: any) => {
        console.log(res.data.rows[0]);
      });

    // axios.get("http://localhost:8080/good").then((res: any) => {
    //   console.log(res);
    //   // setName(res);
    // });
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          window.open("http://localhost:8080/login/federated/google", "_self");
        }}
      >
        Login With Google
      </button>
      <div>name: </div>
    </div>
  );
};

export default Login;
