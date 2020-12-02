var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    var transactions = db.get('transactions').value();
    var users = db.get('users').value();
    var books = db.get('books').value();

    var result = [];

    // code logic

    /* 
        [
            { id: 1, user: { id: 1, name: 'Trung'}, book: {id: 1, title: 'Truyen kieu'} },
            { id: 2, user: { id: 2, name: 'Khoi'}, book: {id: 3, title: 'Code dao'} },
        ]
    */

    // chuyen thg transaction => 1 new transaction hien thi dc user.name va book.name

    transactions.map(function(transaction) {
        var obj = {};

        obj.id = transaction.id;
        obj.isComplete = transaction.isComplete;

        users.map(function(user) {
            if (transaction.userId === user.id) {
                return obj.user = user;
            }
        });

        books.map(function(book) {
            if (transaction.bookId === book.id) {
                return obj.book = book;
            }
        });

        return result.push(obj);
    });

    res.render('transactions/index', {
        transactions: result
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
    db.get('transactions').push(req.body).write();

    res.redirect('/transactions');
};

module.exports.postUpdate = function(req, res) {
    var id = req.params.transactionId;

    req.body.isComplete = JSON.parse(req.body.isComplete);

    db.get('transactions').find({ id }).assign(req.body).write();

    res.redirect('/transactions');
}