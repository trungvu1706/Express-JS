var express = require('express');
var shortid = require('shortid');
var db = require('../db');

var router = express.Router();

//GET
router.get('/', function(req, res) {
    res.render('users/index', {
        lists: db.get('users').value()
    });
});

router.get('/create', function(req, res) {
    res.render('users/create')
});

router.get('/search', function(req, res) {
    var q = req.query.q;
    var searchUser = db.get('users').value();
    var matchedUser = searchUser.filter(function(user) { // [{ name: "" }]
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    console.log(matchedUser);
    res.render('users/index', {
        lists: matchedUser
    });
});

router.get('/:userId', function(req, res) {
    var id = req.params.userId;
    db.get('users').find({ id }).value();

});

router.get('/:userId/delete', function(req, res) {
    var id = req.params.userId;
    db.get('users').remove({ id }).write();
    res.redirect('/users');
});

router.get('/:userId/view', function(req, res) {
    var id = req.params.userId;
    var user = db.get('users').find({ id }).value();
    res.render('users/view', {
        user: user
    });
});

router.get('/:userId/update', function(req, res) {
    var id = req.params.userId;
    var newUser = db.get('users').find({ id }).value();
    res.render('users/update', {
        user: newUser
    });
});








// POST

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});


router.post('/:userId/update', function(req, res) {
    var id = req.params.userId;
    var name = req.body.name;
    db.get('users').find({ id }).assign({ name: name }).write();
    res.redirect('/users');
});








module.exports = router;