const { signedCookie } = require('cookie-parser');
var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
    if (!req.signedCookies.userId) {
        return res.redirect('/auth/login');
    }

    var user = db.get('users').find({ id: req.signedCookies.userId }).value();

    if (!user) {
        return res.redirect('auth/login');
    }

    res.locals.user = user;

    next();
};