const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

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
