var express = require('express');
var shortid = require('shortid');
var db = require('../db');


var router = express.Router();

router.get('/', function(req, res) {
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
        console.log(obj.id);
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
    console.log(result);

    res.render('transactions/index', {
        transactions: result
    });

});

router.get('/create', function(req, res) {
    var books = db.get('books').value();
    var users = db.get('users').value();

    res.render('transactions/create', {
        books: books,
        users: users
    });
});

router.get('/:bookId', function(req, res) {
    var id = req.params.bookId;
    db.get('books').find({ id }).value();

})

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions');
});

module.exports = router;