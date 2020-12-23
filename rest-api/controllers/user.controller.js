var bcrypt = require('bcrypt');
const fs = require('fs');

var cloudinary = require('cloudinary').v2;

var User = require('../models/user.model')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


module.exports.index = async function(req, res) {

    try {
        var users = [];

        var userLogin = await User.find({ id: req.signedCookies.userId });

        if (!userLogin) {
            return res.render('users/index', {
                errors: [
                    'Your account is unvalid'
                ]
            });
        }

        if (userLogin.isAdmin) {
            users = await User.find();
        } else {
            users = await User.find({ id: userLogin.id });
        }

        res.render('users/index', {
            users: users,
            userLogin
        });
    } catch (error) {
        console.log(error);
    }


};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.search = async function(req, res) {

    try {
        var q = req.query.q;
        var searchUser = await User.find();
        var matchedUser = searchUser.filter(function(user) { // [{ name: "" }]
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('users/index', {
            users: matchedUser
        });
    } catch (error) {
        console.log(error);
    }

};


module.exports.delete = async function(req, res) {

    try {
        var id = req.params.userId;
        await User.deleteOne({ _id: id });
        res.redirect('/users');

    } catch (error) {
        console.log(error);
    }

};

module.exports.view = async function(req, res) {

    try {
        var id = req.params.userId;
        var user = await User.findOne({ _id: id });
        res.render('users/view', {
            user: user
        });

    } catch (error) {
        console.log(error);
    }

};

module.exports.update = async function(req, res) {

    try {
        var id = req.params.userId;
        var user = await User.findOne({ _id: id });

        res.render('users/update', {
            user,
            values: user
        });

    } catch (error) {
        console.log(error);
    }


};

module.exports.postCreate = async function(req, res, next) {

    try {
        req.body.isAdmin = JSON.parse(req.body.isAdmin);
        req.body.passWrong = 0;

        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            req.body.avatar = secure_url;
            fs.unlinkSync(req.file.path);
        } else {
            req.body.avatar = '/uploads/default-avatar.png';
        }
        // public/uploads/img => "public/uploads/img" =>  ["public", "uploads", "img"] => ["uploads", "img"] => "uploads/img".

        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var errors = [];

        var user = User.find({ email });

        if (user) {
            errors.push('Email does exist!');
        }

        var isExistedPhone = User.find({ phone });

        if (isExistedPhone) {
            errors.push('Phone does exist!');
        }

        var saltRounds = 10;
        var hash = await bcrypt.hash(password, saltRounds);
        req.body.password = hash;

        var userPassword = new User(req.body);
        await userPassword.save();
        // db.get('users').push(req.body).write();
        res.redirect('/users');

    } catch (error) {
        console.log(error);
    }

};

module.exports.postUpdate = async function(req, res) {
    try {
        var id = req.params.userId;
        var phone = req.body.phone;
        var password = req.body.password;
        // avatar = req.file.path.split('/').slice(1).join('/');

        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            req.body.avatar = image.secure_url;
            fs.unlinkSync(req.file.path)
        } else {
            req.body.avatar = '/uploads/default-avatar.png';
        }

        var user = await User.findOne({ _id: id });

        if (!user) {
            return res.render('users/update', {
                errors: ['User not found'],
                user: { id }
            })
        }

        var isExistedPhone = await User.findOne({ phone });
        // null || {  }

        if (isExistedPhone) {
            return res.render('users/update', {
                errors: ['Phone is existed'],
                user: { id }
            })
        }

        var saltRounds = 10;
        var hash = await bcrypt.hash(password, saltRounds);
        req.body.password = hash;

        var userPassword = new User(req.body);
        await userPassword.save();

        await User.update({ _id: id }, req.body);
        res.redirect('/users');

    } catch (error) {
        console.log(error);
    }

};