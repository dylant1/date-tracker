"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../db");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
function checkUser(userId, provider) {
    const SQL = "SELECT * FROM federated_credentials WHERE provider = ? AND ID = ?";
    console.log("this is the userid from checkUser", userId);
    const values = [provider, userId];
    return db
        .query(SQL, values)
        .then((result) => {
        console.log("here is the user from SQL", result.rows[0]);
        return result.rows[0];
    })
        .catch((err) => {
        console.log(err);
    });
} // TODO: Change this callback
//TODO: Update any types to be more specific
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ||
        "776061143871-1th2bo6vfontl3au466is4loaejr314t.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    callbackURL: "/oauth/google/callback",
}, (accessToken, refreshToken, profile, cb) => {
    //TOOD: Create a user here if one doesn't exist
    const newUser = {
        ID: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
    };
    try {
        //find the user in our database
        const user = checkUser(newUser.ID, "google");
        if (user) {
            cb(null, user);
        }
        else {
            //create a user
        }
    }
    catch (err) {
        console.log(err);
    }
}));
// TODO: setup a redirect URI route: /oauth2/redirect/google on port 4000
router.get("/home", (req, res) => {
    res.send("home");
});
router.get("/login", ensureAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.user);
}));
// maybe add scope
router.get("/login/federated/google", passport.authenticate("google"));
router.get("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/");
});
module.exports = router;
