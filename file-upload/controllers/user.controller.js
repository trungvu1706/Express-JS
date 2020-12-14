var bcrypt = require('bcrypt');

var cloudinary = require('cloudinary').v2;

var shortid = require('shortid');
var db = require('../db');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


module.exports.index = function(req, res) {
    var users = [];

    var userLogin = db.get('users').find({ id: req.signedCookies.userId }).value();

    if (!userLogin) {
        return res.render('users/index', {
            errors: [
                'Your account is unvalid'
            ]
        });
    }

    if (userLogin.isAdmin) {
        users = db.get('users').value();
    } else {
        users = db.get('users').filter({ id: userLogin.id }).value();
    }

    res.render('users/index', {
        users: users,
        userLogin
    });

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
        users: matchedUser
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
        user: newUser,
        values: newUser
    });

};

module.exports.postCreate = async function(req, res, next) {
    try {
        req.body.id = shortid.generate();
        req.body.isAdmin = JSON.parse(req.body.isAdmin);
        req.body.passWrong = 0;
        console.log(req.file);
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            req.body.avatar = secure_url;
        } else {
            req.body.avatar = '/uploads/default-avatar.png';
        }
        // req.body.avatar = 'uploads/' + req.file.filename;
        // public/uploads/img => "public/uploads/img" =>  ["public", "uploads", "img"] => ["uploads", "img"] => "uploads/img".

        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var errors = [];


        var user = db.get('users').find({ email }).value();

        if (user) {
            errors.push('Email does exist!');
        }

        var isExistedPhone = db.get('users').find({ phone }).value();

        if (isExistedPhone) {
            errors.push('Phone does exist!');
        }

        var saltRounds = 10;
        var hash = await bcrypt.hash(password, saltRounds);
        req.body.password = hash;

        db.get('users').push(req.body).write();
        res.redirect('/users');

    } catch (error) {
        console.log(error);
    }

};

module.exports.postUpdate = function(req, res) {
    var id = req.params.userId;
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var avatar = req.body.avatar;
    avatar = req.file.path.split('/').slice(1).join('/');


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

    db.get('users').find({ id }).assign({ name, phone, password, avatar }).write();
    res.redirect('/users');
};