var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions')
            .push({ id: sessionId, cart: {} })
            .write();
    }


    var sessions = db.get('sessions').find({ id: sessionId || req.signedCookies.sessionId }).value();
    // console.log(sessions);

    var countCart = 0;
    for (let item in sessions.cart) {
        countCart += sessions.cart[item];
    }


    res.locals.countCart = countCart;
    next();
}