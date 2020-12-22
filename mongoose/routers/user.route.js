var express = require('express');

var router = express.Router();

var controller = require('../controllers/user.controller');

var validate = require('../validate/user.validate');

var multer = require('multer');

var upload = multer({ dest: './public/uploads/' });


//GET
router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/:userId/delete', controller.delete);

router.get('/:userId/view', controller.view);

router.get('/:userId/update', controller.update);

// POST
router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);

router.post('/:userId/update',
    upload.single('avatar'),
    validate.postUpdate,
    controller.postUpdate
);


module.exports = router;