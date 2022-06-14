import { Request, Response, NextFunction } from "express";
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../db");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/test", (req: any, res: any) => {
  // res.send(req.user);
  res.send("allgood");
});
//TODO: change this route to just be /date cause create is redundant
router.post("/create/date", (req: any, res: any) => {
  res.send("POST request to the homepage");
  console.log(req.body);
  try {
    db.query(
      "INSERT INTO dates (user_id, date_created, date, time, title, description, hidden) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        req.body.user_id,
        req.body.date_created,
        req.body.date,
        req.body.time,
        req.body.title,
        req.body.description,
        req.body.hidden,
      ]
    );
  } catch (err) {
    console.log(err);
  }
});
router.get("/dates", async (req: any, res: any) => {
  try {
    if (req.user) {
      db.query("SELECT * FROM dates WHERE user_id = $1", [
        parseInt(req.user.rows[0].id),
      ])
        .then((result: any) => res.send(result))
        .catch((err: any) => {
          console.log(err);
        });
      console.log(parseInt(req.user.rows[0].id));
    } else {
      console.log("NOT LOGGED IN");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
