// requiring dependencies or files needed in the app==============>
const express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
const hbs = require("hbs");
let mongoose = require("mongoose");
let path = require("path");
let bodyParser = require("body-parser");
let userRouter = require("./routes/user");
let homeRouter = require("./routes/home");
let usersRouter = require("./routes/users");
let createError = require("http-errors");
let errorRouter = require("./routes/error");

PORT = process.env.PORT;
mongo_uri = process.env.MONGO_URI
// creating an instance of the express app==========================>
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));


// view engine setup==============================================>
app.set("views", path.join(__dirname, "views/main"));
app.set("view engine", "hbs");

// Enabling partials folder=====================================>
const partialsDir = path.join(__dirname, "views", "partials");
hbs.registerPartials(partialsDir);

// connecting to the mongoDb database===================================>
mongoose.connect("mongodb://localhost:27017/blogdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  cors({
    origin: "*",
  })
);

// creating the different routes of the app================================>
app.use("/", homeRouter); //home route
app.use("/user", userRouter); //login, signup,write,  update, delete route
app.use("/error", errorRouter); //error msg route
app.use("/users", usersRouter); //users, search route


// catch 404 and forward to error handler===================>
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler===================================================>
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page================================================>
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
