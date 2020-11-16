const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      proxy: true,
    },
    async (username, password, done) => {
      const existingUser = await User.findOne({
        username: username,
        password: password,
      });
      if (existingUser) {
        return done(null, existingUser);
      } else {
        return done(null, false);
      }
    }
  )
);