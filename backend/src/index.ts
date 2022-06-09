require("dotenv").config(__dirname + "/.env");
import { Request, Response, Application } from "express";
const express = require("express");
const authRouter = require("./routes/auth");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const app: Application = express();

// TODO: add store later
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
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
