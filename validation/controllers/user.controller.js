var shortid = require('shortid');
var db = require('../db');
const isVietnamesePhoneNumber = require('../helpers/check-phone-number');
const isValidPersonName = require('../helpers/check-person-name');
const { values } = require('../db');

module.exports.index = function(req, res) {
    res.render('users/index', {
        lists: db.get('users').value()
    });
};

module.exports.create = function(req, res) {
    res.render('users/create')
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var searchUser = db.get('users').value();
    var matchedUser = searchUser.filter(function(user) { // [{ name: "" }]
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    console.log(matchedUser);
    res.render('users/index', {
        lists: matchedUser
    });
};


module.exports.get = function(req, res) {
    var id = req.params.userId;
    db.get('users').find({ id }).value();

};

module.exports.delete = function(req, res) {
    var id = req.params.userId;
    db.get('users').remove({ id }).write();
    res.redirect('/users');
};

module.exports.view = function(req, res) {
    var id = req.params.userId;
    var user = db.get('users').find({ id }).value();
    res.render('users/view', {
        user: user
    });
};

module.exports.update = function(req, res) {
    var id = req.params.userId;
    var newUser = db.get('users').find({ id }).value();
    res.render('users/update', {
        user: newUser
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required');
    }

    if (!isValidPersonName(req.body.name)) {
        errors.push('Name is invalid')
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }

    if (!isVietnamesePhoneNumber(req.body.phone)) {
        errors.push('Phone is invalid');
    }

    if (errors.length) {
        return res.render('users/create', {
            errors: errors,
            values: req.body
        });
    }
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.postUpdate = function(req, res) {
    var id = req.params.userId;
    var name = req.body.name;
    var phone = req.body.phone;
    db.get('users').find({ id }).assign({ name: name, phone: phone }).write();
    res.redirect('/users');
};