import type { NextPage } from "next";
import axios from "axios";
const Login: NextPage = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.open("http://localhost:8080/login/federated/google", "_self");
        }}
      >
        Login With Google
      </button>
    </div>
  );
};

export default Login;
