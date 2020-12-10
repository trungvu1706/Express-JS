var md5 = require('md5');
var bcrypt = require('bcrypt');

var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email }).value(); // kiem tra no co ton tai trong db ko

    if (!user) {
        return res.render('auth/login', {
            errors: [
                'Email does not exist!'
            ],
            values: req.body
        });
    }

    var matchPassword = await bcrypt.compare(password, user.password);
    console.log(matchPassword);

    if (!matchPassword) {
        db.get('users').find({ email }).assign({ passWrong: user.passWrong + 1 }).write();

        if (user.passWrong + 1 > 4) {
            return res.render('auth/login', {
                errors: [
                    'Password Wrong 4 times'
                ],
                values: req.body
            })
        }

        return res.render('auth/login', {
            errors: [
                'Password Wrong!'
            ],
            values: req.body
        })

    }

    db.get('users').find({ email }).assign({ passWrong: 0 }).write();





    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/home');

}