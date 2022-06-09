require("dotenv").config(__dirname + "/.env");
import { Request, Response, Application } from "express";
const express = require("express");
const authRouter = require("./routes/auth");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const app: Application = express();
const { Client } = require("pg");
const test = async () => {
  try {
    const client = new Client({
      host: "host.docker.internal",
      user: "root",
      password: "root",
      port: "5432",
    });
    await client.connect();
    await client.query(
      "CREATE TABLE IF NOT EXISTS users ( \
    id BIGSERIAL PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BYTEA, \
    salt BYTEA, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER );"
    );
    await client.query(
      "CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id BIGINT PRIMARY KEY, \
    user_id BIGINT NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL );"
    );
    console.log("success");
    await client.end();
  } catch (err: any) {
    console.log(err);
    console.log("fial");
  }
};
// test();

// TODO: add store later
app.use(cors());
app.use(bodyParser.json());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("tset");
});
app.listen(process.env.PORT || 8080, (): void => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});

//TODO: Setup pg tables
