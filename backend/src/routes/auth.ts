import { doesNotMatch } from "assert";
import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../db");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
let userProfile: any;
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
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth/google/callback",
    },
    function (issuer: any, profile: any, cb: any) {
      db.get(
        "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
        [issuer, profile.id],
        function (err: any, cred: any) {
          if (err) {
            return cb(err);
          }
          if (!cred) {
            // The Google account has not logged in to this app before.  Create a
            // new user record and link it to the Google account.
            db.run(
              "INSERT INTO users (name) VALUES (?)",
              [profile.displayName],
              function (err: any) {
                if (err) {
                  return cb(err);
                }

                let id = profile.id;
                db.run(
                  "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                  [id, issuer, profile.id],
                  function (err: any) {
                    if (err) {
                      return cb(err);
                    }
                    var user = {
                      id: id.toString(),
                      name: profile.displayName,
                    };
                    return cb(null, user);
                  }
                );
              }
            );
          } else {
            // The Google account has previously logged in to the app.  Get the
            // user record linked to the Google account and log the user in.
            db.get(
              "SELECT * FROM users WHERE id = ?",
              [cred.user_id],
              function (err: any, user: any) {
                if (err) {
                  return cb(err);
                }
                if (!user) {
                  return cb(null, false);
                }
                return cb(null, user);
              }
            );
          }
        }
      );
    }
  )
);
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         process.env.GOOGLE_CLIENT_ID ||
//         "776061143871-1th2bo6vfontl3au466is4loaejr314t.apps.googleusercontent.com",
//       clientSecret:
//         process.env.GOOGLE_CLIENT_SECRET ||
//         "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",
//       callbackURL: "/oauth/google/callback",
//     },
//     (issuer: any, profile: any, done: any) => {
//      db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//       issuer,
//       profile.id
//     ], function(err: any, cred: any) {
//       if (err) { return done(err); }
//       if (!cred) {
//         // The Facebook account has not logged in to this app before.  Create a
//         // new user record and link it to the Facebook account.
//         db.run('INSERT INTO users (name) VALUES (?)', [
//           profile.displayName
//         ], function(err: any) {
//           if (err) { return done(err); }
//           let id = profile.id;
//           db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
//             id,
//             issuer,
//             profile.id
//           ], function(err: any) {
//             if (err) { return done(err); }
//             let user = {
//               id: id.toString(),
//               name: profile.displayName
//             };
//             return done(null, user);

//         //       });
//         // });

//       } else {
//         // The Google account has previously logged in to the app.  Get the
//         // user record linked to the Google account and log the user in.
//         db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err: any, user: any) {
//           if (err) { return done(err); }
//           if (!user) { return done(null, false); }
//           return done(null, user);
//         });
//       }
//     };
//   }
// ));
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
router.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

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
    successRedirect: "/good",
    failureRedirect: "/failed",
  })
);
passport.serializeUser(function (user: any, done: any) {
  console.log("serialise user");
  done(null, user);
});

// this function takes the id, returns the user object.
passport.deserializeUser(function (user: any, done: any) {
  console.log("deserialise user");
  // User.findById(id, function (err, user) {
  done(null, user);
  // });
});

router.get("/failed", (req: any, res: any) =>
  res.send("You failed to log in!")
);

router.get("/good", isLoggedIn, (req: any, res: any) =>
  res.send(`You logged in! Welcome ${userProfile}`)
);
module.exports = router;
