var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userId) {
        return res.redirect('/auth/login');
    }

    var user = db.get('users').find({ id: req.cookies.userId }).value();

    if (!user) {
        return res.redirect('auth/login');
    }

    next();
};