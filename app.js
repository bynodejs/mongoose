"use strict";

// require modules
const express = require("express"),
  logger = require("morgan"),
  path = require("path"),
  helmet = require("helmet"),
  cors = require("cors"),
  hpp = require("hpp"),
  app = express();

// require lib
const mongoose = require("./lib/mongoose");
mongoose.connection();

// setup view engine (ejs)
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(hpp());
app.use(cors());
app.use(helmet());

app.use("/", require("./routes/index"));
app.use("/boards", require("./routes/boards"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Fount");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error("[ERROR] ", err);

  // render the error page
  res.status(err.status || 500).render("error");
});

module.exports = app;
