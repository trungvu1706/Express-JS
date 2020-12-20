const shortid = require("shortid");
const { result } = require("../db");
const db = require("../db");

module.exports.addToCart = function(req, res) {
    try {
        var bookId = req.params.bookId; // lay id cua book
        var sessionId = req.signedCookies.sessionId; // lay id cua session

        if (!sessionId) {
            return res.redirect('/books');
        }

        var count = db.get('sessions')
            .find({ id: sessionId })
            .get('cart.' + bookId, 0)
            .value();

        db.get('sessions')
            .find({ id: sessionId })
            .set('cart.' + bookId, count + 1) // => cart.bookId : value 
            .write();

        res.redirect('/books');


    } catch (error) {
        console.log(error);
    }

};

module.exports.index = function(req, res) {

    try {
        var sessionId = req.signedCookies.sessionId;
        var session = db.get('sessions')
            .find({ id: sessionId })
            .value();

        var books = db.get('books').value();
        var results = [];

        console.log(session, sessionId)

        var convertCart = Object.keys(session.cart);

        convertCart.map(function(key) {
            var obj = {
                id: key,
                quantity: session.cart[key]
            }

            books.map(function(book) {
                if (obj.id === book.id) {
                    return obj.title = book.title;
                }
            });

            return results.push(obj);
        });

        res.render('cart/index', {
            cart: results
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.postCart = function(req, res) {

    try {
        var sessionId = req.signedCookies.sessionId; // lay id cua session
        var userId = req.signedCookies.userId;
        var session = db.get('sessions').find({ id: sessionId }).value();
        var convertCart = Object.keys(session.cart);

        /*
            {
                "userId": "uQJP8isZG",
                "books": [
                    { bookId: 'abc', quantity: 4 },
                    { bookId: 'abc', quantity: 4 }
                ],
                "id": "XERt6wWW6",
                "isComplete": false,
            },
        */
        var obj = {
            id: shortid.generate(),
            userId: userId,
            isComplete: false,
            books: []
        }

        convertCart.map(function(key) {
            obj.books.push({
                bookId: key,
                quantity: session.cart[key],
            })
        });

        db.get('transactions').push(obj).write();

        db.get('sessions').remove({ id: sessionId }).write();

        res.clearCookie("sessionId");

        // sau khi them vao transaction thi xoa gio hang (session) di

        res.redirect('/books');
    } catch (error) {
        console.log(error);
    }
}