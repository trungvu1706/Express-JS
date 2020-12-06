var shortid = require('shortid');
var db = require('../db');


module.exports.index = function(req, res) {
    res.render('books/index', {
        lists: db.get('books').value()
    });
};

module.exports.create = function(req, res) {
    res.render('books/create');
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var searchBook = db.get('books').value();

    var matchedBook = searchBook.filter(function(book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('books/index', {
        lists: matchedBook
    });
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    db.get('books').find({ id }).value();
};

module.exports.update = function(req, res) {
    var id = req.params.bookId;
    var newBook = db.get('books').find({ id }).value();

    res.render('books/update', {
        book: newBook
    });
};

module.exports.view = function(req, res) {
    var id = req.params.bookId;
    var bookInfo = db.get('books').find({ id }).value();

    res.render('books/view', {
        book: bookInfo
    });
};

module.exports.delete = function(req, res) {
    var id = req.params.bookId;
    db.get('books').remove({ id }).write();
    res.redirect('/books');
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
};

module.exports.postUpdate = function(req, res) {
    var id = req.params.bookId;
    var bookTitle = req.body.title;
    var content = req.body.description;

    db.get('books').find({ id: id }).assign({ title: bookTitle, description: content }).write();

    res.redirect('/books');
};