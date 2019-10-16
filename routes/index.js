"use strict";

// require modules
const router = require("express").Router();

/**
 * @url BASE_URL/
 * @type GET
 * @description page render
 */
router.get("/", (req, res, next) => {
  res.status(200).render("board");
});

module.exports = router;
