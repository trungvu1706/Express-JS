var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {

    var users = db.get('users').value();
    var books = db.get('books').value();
    var transactions = [];
    var result = [];

    var page = parseInt(req.query.page) || 1; // n
    var perPage = 4; // x

    var drop = (page - 1) * perPage;


    var userLogin = db.get('users').find({ id: req.signedCookies.userId }).value();
    if (!userLogin) {
        return res.render('transactions/index', {
            errors: [
                'Your account is unvalid!'
            ]
        });
    }

    if (userLogin.isAdmin) {
        transactions = db.get('transactions').drop(drop).take(perPage).value();

    } else {
        transactions = db.get('transactions').filter({ userId: userLogin.id }).value();

    }

    transactions.map(function(transaction) {
        var obj = {
            user: {},
            book: {}
        };

        obj.id = transaction.id;
        obj.isComplete = transaction.isComplete;

        users.map(function(user) {
            if (transaction.userId === user.id) {
                return obj.user = user;
            }
        });
        console.log(obj.user)



        books.map(function(book) {
            if (transaction.bookId === book.id) {
                return obj.book = book;
            }
        });
        // console.log(obj.book)

        return result.push(obj);
    });


    // var test = result.filter(function(transaction) {
    //     return transaction.user === undefined;
    // })
    // console.log(test);

    res.render('transactions/index', {
        transactions: result,
        userLogin
    });
};




module.exports.create = function(req, res) {
    var books = db.get('books').value();
    var users = db.get('users').value();

    res.render('transactions/create', {
        books: books,
        users: users
    });
};


module.exports.update = function(req, res) {
    var id = req.params.transactionId;
    var newTransaction = db.get('transactions').find({ id }).value();

    // null or undefined

    var books = db.get('books').value();
    var users = db.get('users').value();

    res.render('transactions/update', {
        transaction: newTransaction,
        books: books,
        users: users
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    req.body.isAdmin = false;

    db.get('transactions').push(req.body).write();

    res.redirect('/transactions');
};

module.exports.postUpdate = function(req, res) {
    var id = req.params.transactionId;

    req.body.isComplete = JSON.parse(req.body.isComplete);

    db.get('transactions').find({ id }).assign(req.body).write();

    res.redirect('/transactions');
}