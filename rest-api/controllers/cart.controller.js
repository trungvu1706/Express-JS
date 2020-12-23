var User = require('../models/user.model');
var Book = require('../models/book.model');
var Cart = require('../models/cart.model');
var Transaction = require('../models/transaction.model');

module.exports.addToCart = async function(req, res) {
    try {

        var bookId = req.params.bookId; // lay id cua book
        var sessionId = req.signedCookies.sessionId; // lay id cua session

        if (!sessionId) {
            return res.redirect('/books');
        }

        // B1 Click button add to cart
        // B2 Kiem tra xem cart da ton tai hay chua
        // Neu cart ko ton tai thi tao moi
        // Neu cart da ton tai roi => update so luong len 1 don vi

        var isExistedCart = await Cart.findOne({ book: bookId, session: sessionId });

        if (!isExistedCart) {
            const cart = new Cart({ book: bookId, session: sessionId })
            await cart.save();
            return res.redirect('/books');
        }

        await Cart.findOneAndUpdate({ _id: isExistedCart._id }, {
            $inc: {
                quantity: 1
            }
        });

        res.redirect('/books');
    } catch (error) {
        console.log(error);
    }

};

module.exports.index = async function(req, res, next) {

    try {
        var cart = await Cart.find()
            .populate({ path: 'book', select: 'title' });

        var a;
        a.b();

        // console.log(cart);
        res.render('cart/index', {
            cart
        });

    } catch (error) {
        res.status(500).send('Something Broke!');
        next(error);
    }
}

module.exports.postCart = async function(req, res) {

    try {
        var sessionId = req.signedCookies.sessionId; // lay id cua session
        var carts = await Cart.find({ session: sessionId });
        var books = [];

        for (cart of carts) {
            books.push({
                book: cart.book,
                quantity: cart.quantity
            })
        }

        var transaction = new Transaction({
            user: req.user._id,
            isComplete: false,
            books: carts
        })

        await transaction.save();

        await Cart.deleteMany({ session: sessionId });
        res.redirect('/books');
    } catch (error) {
        console.log(error);
    }
}