const express = require("express");

const router = express.Router();

const controller = require("../controllers/book.controller.js");

router.get("/", controller.getBooks);

module.exports = router;
