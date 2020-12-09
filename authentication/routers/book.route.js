var express = require('express');

var router = express.Router();

var controller = require('../controllers/book.controller');

// GET
router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/:bookId', controller.get);

router.get('/:bookId/update', controller.update);

router.get('/:bookId/view', controller.view);


router.get('/:bookId/delete', controller.delete);

// POSTS
router.post('/create', controller.postCreate);

router.post('/:bookId/update', controller.postUpdate);



module.exports = router;