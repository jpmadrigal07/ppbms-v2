const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const UserRoute = require("./routes/user");
const AnnouncementRoute =require("./routes/announcement");
const PaymentRoute = require("./routes/payment");
const ContactMessageRoute =require("./routes/contactMessage");
const ReferralRoute =require("./routes/referral");
const AuthRoute = require('./routes/auth');
require("./services/passport");

const app = express();

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static('public'));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/', AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/announcement",AnnouncementRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/messages", ContactMessageRoute);
app.use("/api/referral", ReferralRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));