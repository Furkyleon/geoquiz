require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const passport = require("passport");

// database & passport config
require("./db");
require("./config/passport");

// routers
var usersRouter = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const authRoutes = require("./routes/authRoutes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS → only your React app
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// passport
app.use(passport.initialize());

// routes
app.use("/users", usersRouter);
app.use("/quiz", quizRoutes);
app.use("/auth", authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.json({
        message: res.locals.message,
        error: res.locals.error,
    });
});

module.exports = app;
