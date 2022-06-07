import express, { Application, Request, Response } from "express";
const authRouter = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");
const app: Application = express();

require("dotenv").config();

// TODO: add store later
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

app.listen(process.env.PORT, (): void => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//TODO: Setup pg tables
