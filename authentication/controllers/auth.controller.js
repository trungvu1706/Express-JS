var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email }).value(); // kiem tra no co ton tai trong db ko

    // thoa man ca 2 dieu kien

    if (!user) {
        return res.render('auth/login', {
            errors: [
                'Email does not exist!'
            ],
            values: req.body
        });
    }

    if (user.password !== password) {
        return res.render('auth/login', {
            errors: [
                'Wrong password!'
            ],
            values: req.body
        });
    }
    res.cookie('userId', user.id);
    res.redirect('/home');

}