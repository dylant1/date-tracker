"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(__dirname + "/.env");
const express = require("express");
const authRouter = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");
const app = express();
const { Client } = require("pg");
// const test = async () => {
//   try {
//     const client = new Client({
//       host: "host.docker.internal",
//       user: "root",
//       password: "root",
//       // database: "postgres",
//       port: "5432",
//     });
//     await client.connect();
//     const res = await client.query("SELECT NOW()");
//     await client.end();
//     console.log(res);
//   } catch (err: any) {
//     console.log(err);
//   }
// };
// test();
// TODO: add store later
app.use(require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);
app.get("/", (req, res) => {
    res.send(process.env.GOOGLE_CLIENT_ID);
});
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
//TODO: Setup pg tables
