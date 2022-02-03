const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require("mongoose");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



module.exports = router;
