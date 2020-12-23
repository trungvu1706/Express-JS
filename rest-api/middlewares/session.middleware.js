var Session = require('../models/session.model');
var Cart = require('../models/cart.model');

module.exports = async function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        var session = new Session();
        await session.save();

        res.cookie('sessionId', session._id, {
            signed: true
        });
    }

    var cart = await Cart.find({ session: sessionId });

    var countCart = 0;
    for (let item of cart) {
        countCart += item.quantity
    }


    res.locals.countCart = countCart;
    next();
}