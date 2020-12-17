var express = require('express');

var router = express.Router();

var controller = require('../controllers/home.controller');

router.get('/', controller.index);

module.exports = router;