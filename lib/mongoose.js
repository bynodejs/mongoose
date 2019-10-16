"use strict";

// require modules
const mongoose = require("mongoose");

// setting options
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

/**
 * @method connect
 * @description mongodb connection
 */
exports.connection = () => {
  mongoose
    .connect("mongodb://root:password@localhost:27017/mongodb", {
      auth: { authSource: "admin" },
      ...options
    })
    .then(() => {
      console.log("🚀 mongodb connected");
    })
    .catch(error => {
      throw new Error("mongodb connection error", error);
    });
};
