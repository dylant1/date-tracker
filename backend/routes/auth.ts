import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../db");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

export interface IGetUserAuthInfoRequest extends Request {
  user: string;
}
export interface IGetUserLogout extends Request {
  logout: () => void;
}
export interface IUser {
  ID: string;
  username?: string;
  email: string;
  password?: string;
}
function checkUser(userId: string, provider: string) {
  const SQL =
    "SELECT * FROM federated_credentials WHERE provider = ? AND ID = ?";
  console.log("this is the userid from checkUser", userId);
  const values = [provider, userId];
  return db
    .query(SQL, values)
    .then((result: any) => {
      console.log("here is the user from SQL", result.rows[0]);
      return result.rows[0];
    })
    .catch((err: any) => {
      console.log(err);
    });
} // TODO: Change this callback
//TODO: Update any types to be more specific
passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        "776061143871-1th2bo6vfontl3au466is4loaejr314t.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
      callbackURL: "/oauth/google/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      //TOOD: Create a user here if one doesn't exist
      const newUser: IUser = {
        ID: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      };
      try {
        //find the user in our database

        const user = checkUser(newUser.ID, "google");
        if (user) {
          cb(null, user);
        } else {
          //create a user
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
// TODO: setup a redirect URI route: /oauth2/redirect/google on port 4000
router.get("/home", (req: Request, res: Response) => {
  res.send("home");
});

router.get(
  "/login",
  ensureAuth,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    res.send(req.user);
  }
);

// maybe add scope
router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/logout",
  function (req: IGetUserLogout, res: Response, next: NextFunction) {
    req.logout();
    res.redirect("/");
  }
);

module.exports = router;
