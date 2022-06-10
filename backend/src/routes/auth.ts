import { Request, Response, NextFunction } from "express";
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
const isLoggedIn = (req: any, res: any, next: any) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth/google/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      db.query(
        "SELECT * FROM users WHERE provider = $1 AND user_id = $2",
        ["www.google.com", profile.id],
        function (err: any, cred: any) {
          if (err) {
            return done(err);
          }
          if (cred.rowcount == 0) {
            db.query(
              "INSERT INTO users (name, user_id, provider, email) VALUES ($1, $2, $3, $4)",
              [
                profile.displayName,
                profile.id,
                "www.google.com",
                profile.emails[0].value,
              ],
              function (err: any) {
                if (err) {
                  return done(err);
                }
                let user = {
                  user_id: profile.id.toString(),
                  name: profile.displayName,
                };

                return done(null, user);
              }
            );
          } else {
            db.query(
              "SELECT * FROM users WHERE user_id = $1",
              [cred.rows[0].user_id],
              function (err: any, user: any) {
                if (err) {
                  return done(err);
                }
                if (!user) {
                  return done(null, false);
                }
                return done(null, user);
              }
            );
          }
        }
      );
    }
  )
);

router.get("/home", (req: Request, res: Response) => {
  res.send("home");
});

router.get(
  "/login",
  ensureAuth,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    // console.log(req.user);
    res.send(req.user);
  }
);

router.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/isloggedin", (req: any, res: Response) => {
  // console.log(req.user);
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.get(
  "/logout",
  function (req: IGetUserLogout, res: Response, next: NextFunction) {
    req.logout();
    res.redirect("/");
  }
);
router.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    failureMessage: true,
  }),
  function (req: any, res: any) {
    res.redirect("/good");
  }
);
passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  db.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user.rows[0].user_id],
    function (err: any, user: any) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  );
});

router.get("/failed", (req: any, res: any) =>
  res.send("You failed to log in! ")
);
router.get("/user", isLoggedIn, (req: any, res: any) => {
  res.send(req.user);
});
router.get("/good", isLoggedIn, (req: any, res: any) => {
  // res.send(req.user);
  res.redirect("http://localhost:3000/login");
});

module.exports = router;
