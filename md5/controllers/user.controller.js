var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    var users = [];

    var userLogin = db.get('users').find({ id: req.cookies.userId }).value();
    if (!userLogin) {
        return res.render('users/index', {
            errors: [
                'Your account is unvalid'
            ]
        });
    }

    if (userLogin.isAdmin) {
        users = db.get('users').value()
    } else {
        users = db.get('users').filter({ id: userLogin.id }).value();
    }

    res.render('users/index', {
        users: users,
        userLogin
    });
    console.log(userLogin);
};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var searchUser = db.get('users').value();
    var matchedUser = searchUser.filter(function(user) { // [{ name: "" }]
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

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
    console.log('userUser', newUser);

    res.render('users/update', {
        user: newUser,
        values: newUser
    });

};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.isAdmin = JSON.parse(req.body.isAdmin);
    var email = req.body.email;
    var user = db.get('users').find({ email }).value();
    if (user) {
        errors.push('Email does exist!');
    }

    var phone = req.body.phone;
    var user = db.get('users').find({ phone }).value();
    if (user) {
        errors.push('Phone does exist!');
    }

    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.postUpdate = function(req, res) {
    var id = req.params.userId;
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;

    var user = db.get('users').find({ id }).value();

    if (!user) {
        return res.render('users/update', {
            errors: ['User not found'],
            user: { id }
        })
    }

    var isExistedPhone = db.get('users').find({ phone }).value();
    // undefined || {  }

    if (isExistedPhone) {
        return res.render('users/update', {
            errors: ['Phone is existed'],
            user: { id }
        })
    }

    db.get('users').find({ id }).assign({ name, phone, password }).write();
    res.redirect('/users');
};