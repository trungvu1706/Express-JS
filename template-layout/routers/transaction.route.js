var express = require('express');

var router = express.Router();

var controller = require('../controllers/transaction.controller');

//GET
router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/:transactionId/update', controller.update);



// POST
router.post('/create', controller.postCreate);

router.post('/:transactionId/update', controller.postUpdate);

module.exports = router;