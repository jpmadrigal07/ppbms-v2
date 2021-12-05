const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const UserRoute = require("./routes/user");
const AuthRoute = require('./routes/auth');
const AreaPriceRoute = require("./routes/areaPrice");
const BarcodeMiddleTextRoute = require("./routes/barcodeMiddleText");
const DispatchControlDataRoute = require("./routes/dispatchControlData");
const DispatchControlMessengerRoute = require("./routes/dispatchControlMessenger");
const EncodeListRoute = require("./routes/encodeList");
const RecordRoute = require("./routes/record");
const fileUpload = require('express-fileupload');
require("./services/passport");

const app = express();

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use(fileUpload());

// Use Routes
app.use('/', AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/areaPrice", AreaPriceRoute);
app.use("/api/barcodeMiddleText", BarcodeMiddleTextRoute);
app.use("/api/dispatchControlData", DispatchControlDataRoute);
app.use("/api/dispatchControlMessenger", DispatchControlMessengerRoute);
app.use("/api/encodeList", EncodeListRoute);
app.use("/api/record", RecordRoute);

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