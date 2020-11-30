var express = require('express');
var shortid = require('shortid');
var db = require('../db');

var router = express.Router();


router.get('/', function(req, res) {
    res.render('books/index', {
        lists: db.get('books').value()
    });
});

router.get('/create', function(req, res) {
    res.render('books/create');
});

router.get('/search', function(req, res) {
    var q = req.query.q;
    var searchBook = db.get('books').value();

    var matchedBook = searchBook.filter(function(book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('books/index', {
        lists: matchedBook
    });
});

router.get('/:bookId', function(req, res) {
    var id = req.params.id;
    db.get('books').find({ id }).value();
});

router.get('/:bookId/update', function(req, res) {
    var id = req.params.bookId;
    var newBook = db.get('books').find({ id }).value();

    res.render('books/update', {
        book: newBook
    });
})

router.get('/:bookId/view', function(req, res) {
    var id = req.params.bookId;
    var bookInfo = db.get('books').find({ id }).value();

    res.render('books/view', {
        book: bookInfo
    });
});

// router.delete
router.get('/:bookId/delete', function(req, res) {
    var id = req.params.bookId;
    db.get('books').remove({ id }).write();
    res.redirect('/books');
});

// POSTS
router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
});

router.post('/:bookId/update', function(req, res) {
    var id = req.params.bookId;
    var bookTitle = req.body.title;
    var content = req.body.description;

    db.get('books').find({ id: id }).assign({ title: bookTitle, description: content }).write();

    res.redirect('/books');
});



module.exports = router;