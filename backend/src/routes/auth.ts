import { Request, Response, NextFunction } from "express";
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
//TODO: Update any types to be more specific
const createUser = (user: any) => {};
const getUser = (id: any) => {};
const isUserInDatabase = (issuer: any, profileId: any) => {
  console.log(issuer, profileId);
  db.query(
    "SELECT exists (SELECT 1 FROM federated_credentials WHERE provider = $1 AND subject = $2 LIMIT 1);",
    [issuer, profileId],
    function (err: any, user: any) {
      if (err) {
        console.log(err);
      }
      if (!user.rows[0].exists) {
        return false;
        console.log("not in db");
      } else {
        return true;
        console.log("yes in db");
      }
    }
  );
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
            console.log("error");
            return done(err);
          }
          console.log(cred);
          console.log(cred.length);

          console.log("test");
          if (!cred.length) {
            // The Facebook account has not logged in to this app before.  Create a
            // new user record and link it to the Facebook account.
            db.query(
              "INSERT INTO users (name, user_id, provider, email) VALUES ($1, $2, $3, $4)",
              [
                profile.displayName,
                profile.id,
                "www.google.com",
                profile.email,
              ],
              function (err: any) {
                if (err) {
                  console.log("error");
                  return done(err);
                }
                let user = {
                  user_id: profile.id.toString(),
                  name: profile.displayName,
                };
                return done(null, user);
                console.log("successfully added to users");
              }
            );
          } else {
            // The Facebook account has previously logged in to the app.  Get the
            // user record linked to the Facebook account and log the user in.
            db.query(
              "SELECT * FROM users WHERE id = $1",
              [cred.user_id],
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
// const {
//   id: id,
//   displayName: username,
//   given_name: firstName,
//   family_name: lastName,
//   picture: photo,
//   email: email,
// } = profile;

// const user = {
//   id,
//   username,
//   firstName,
//   lastName,
//   photo,
//   email,
// };
// getUser(id).then((currentUser: any) => {
//   currentUser;

//   if (currentUser.length) {
//     done(null, currentUser[0]);
//   } else {
//     createUser(user);
//     getUser(id)
//       .then((newUser: any) => {
//         newUser;
//         done(null, newUser[0]);
//       })
//       .catch((err: any) => console.log(err));
//   }
// });
//access profile => profile.(id, etc.)
// console.log(profile.id);
// console.log(isUserInDatabase("www.google.com", profile.id));

// userProfile = profile;
// console.log(accessToken);
// done(null, profile); // passes the profile data to serializeUser
// console.log(profile.user_id);
// console.log(profile.id);
// console.log(profile.displayName);
// done(null, profile);
// db.query(
//   "SELECT exists (SELECT 1 FROM federated_credentials WHERE provider = $1 AND subject = $2 LIMIT 1);",
//   ["www.google.com", profile.id],
//   function (err: any, user: any) {
//     if (err) {
//       console.log(err);
//     }
//     if (!user.rows[0].exists) {
//       console.log(user);
//       console.log("not in db");
//       console.log("User.id= ", user.id);
//       console.log("User.displayName", user.displayName);
//       let id = user.id;
//       //add user here
//       // db.run(
//       //               "INSERT INTO users (name) VALUES ($1)",
//       //               [user.displayName],
//       //               function (err: any) {
//       //                 if (err) {
//       //                   return done(err);
//       //                 }

//       //                 let id = user.id
//       //                 db.run(
//       //                   "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
//       //                   [id, issuer, user.id],
//       //                   function (err: any) {
//       //                     if (err) {
//       //                       return done(err);
//       //                     }
//       //                     var user = {
//       //                       id: id.toString(),
//       //                       name: user.displayName,
//       //                     };
//       //                     return done(null, user);
//       //                   }
//       //                 );
//       return done(null, user);
//     } else {
//       console.log("yes in db");
//       //get user
//       // db.get(
//       //   "SELECT 1 FROM users WHERE id = $1",
//       //   [user.user_id],
//       //   function (err: any, user: any) {
//       //     if (err) {
//       //       return done(err);
//       //     }
//       //     if (!user) {
//       //       return done(null, false);
//       //     }
//       //     return done(null, user);
//       //   }
//       // );
//       return done(null, user);
//     }
//   }
// );
//     }
//   )
// );
//     function (issuer: any, profile: any, done: any) {
//       db.get(
//         "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
//         [issuer, profile.id],
//         function (err: any, cred: any) {
//           if (err) {
//             return done(err);
//           }
//           if (!cred) {
//             // The Google account has not logged in to this app before.  Create a
//             // new user record and link it to the Google account.
//             db.run(
//               "INSERT INTO users (name) VALUES (?)",
//               [profile.displayName],
//               function (err: any) {
//                 if (err) {
//                   return done(err);
//                 }

//                 let id = cred.user_id;
//                 db.run(
//                   "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
//                   [cred.user_id, issuer, profile.id],
//                   function (err: any) {
//                     if (err) {
//                       return done(err);
//                     }
//                     var user = {
//                       id: id.toString(),
//                       name: profile.displayName,
//                     };
//                     return done(null, user);
//                   }
//                 );
//               }
//             );
//           } else {
//             // The Google account has previously logged in to the app.  Get the
//             // user record linked to the Google account and log the user in.
//             db.get(
//               "SELECT * FROM users WHERE id = ?",
//               [cred.user_id],
//               function (err: any, user: any) {
//                 if (err) {
//                   return done(err);
//                 }
//                 if (!user) {
//                   return done(null, false);
//                 }
//                 return done(null, user);
//               }
//             );
//           }
//         }
//       );
//     }
//   )
// );
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
  done(null, user);
});

// this function takes the id, returns the user object.
passport.deserializeUser(function (user: any, done: any) {
  // console.log("deserialise user");
  // console.log(user);

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
