"use strict";

const mongoose = require("mongoose"),
  AutoIncrement = require("mongoose-sequence")(mongoose);

const collectionName = "boards";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    content: { type: String, required: true }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

schema.plugin(AutoIncrement, { inc_field: "board_id" });

module.exports = mongoose.model("boards", schema);
