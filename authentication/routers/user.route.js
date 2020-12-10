var express = require('express');

var router = express.Router();

var controller = require('../controllers/user.controller');

var validate = require('../validate/user.validate');



//GET

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/:userId', controller.get);

router.get('/:userId/delete', controller.delete);

router.get('/:userId/view', controller.view);

router.get('/:userId/update', controller.update);








// POST
router.post('/:userId/update', validate.postUpdate, controller.postUpdate);


router.post('/create', validate.postCreate, controller.postCreate);


module.exports = router;