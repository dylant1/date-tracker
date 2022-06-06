import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div>Home Page at the route "/"</div>
      <div>Here we will display the landing page</div>
      <div>there will be a navbar with EXPLORE, LOGIN, SIGN UP</div>
    </div>
  );
};

export default Home;
