require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const authRoutes = require("./routes/authRoutes");

// requires
require("./db"); // Database connection
const session = require("./session"); // Session setup
const passport = require("passport"); // Passport setup
require("./config/passport");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

var allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            // Allow requests with no origin (mobile apps, curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/quiz", quizRoutes);
app.use("/auth", authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.json({
        message: res.locals.message,
        error: res.locals.error,
    });
});

module.exports = app;
