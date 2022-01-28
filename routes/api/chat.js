const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Models
const Chat = require("../../models/Chat");

// @route     POST api/posts/
// @desc      Add a Post
// @access    Private (auth)
