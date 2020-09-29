const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

router.get("/auth/google", function (req, res) {
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/user.gender.read",
    ]
  })(req, res);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const {
      firstName,
      lastName,
      email,
      profilePicture,
      loginMethod,
    } = req.user;
    res.redirect(`/register?firstName=${firstName}&lastName=${lastName}&email=${email}&profilePicture=${profilePicture}&loginMethod=${loginMethod}`);
  }
);

router.get("/auth/facebook", function (req, res) {
  passport.authenticate("facebook", {
    scope: ["email"]
  })(req, res);
});

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    const {
      firstName,
      lastName,
      email,
      profilePicture,
      loginMethod,
    } = req.user;
    res.redirect(`/register?firstName=${firstName}&lastName=${lastName}&email=${email}&profilePicture=${profilePicture}&loginMethod=${loginMethod}`);
  }
);

router.get("/auth/local/callback", (req, res) => {
  res.send(req.user);
});

router.get("/auth/local/failure", (req, res) => {
  res.send(false);
});

router.post(
  "/auth/local",
  passport.authenticate("local-login", {
    successRedirect: "/auth/local/callback",
    failureRedirect: "/auth/local/failure",
  })
);

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
