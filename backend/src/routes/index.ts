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

module.exports = router;
