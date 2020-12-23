var express = require('express');

var router = express.Router();

var controller = require('../controllers/auth.controller');

//GET
router.get('/login', controller.login);


//POST

router.post('/login', controller.postLogin);


module.exports = router;