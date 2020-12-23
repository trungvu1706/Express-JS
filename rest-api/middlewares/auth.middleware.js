const { signedCookie } = require('cookie-parser');

var User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next) {
    try {
        if (!req.signedCookies.userId) {
            return res.redirect('/auth/login');
        }

        var user = await User.findOne({ _id: req.signedCookies.userId });

        if (!user) {
            return res.redirect('auth/login');
        }

        res.locals.user = user;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);

    }

};