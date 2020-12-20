var express = require('express');

var router = express.Router();

var controller = require('../controllers/cart.controller');

var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.index);

router.get('/add/:bookId', controller.addToCart);

router.get('/complete', authMiddleware.requireAuth, controller.postCart);

module.exports = router;