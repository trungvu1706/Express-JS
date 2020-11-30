var express = require('express');
var app = express();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
var path = require('path');
var shortid = require('shortid');
var port = 3000;

db.defaults({ books: [] }).write()

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// GETS
app.get('/books', function(req, res) {
    res.render('books/index', {
        lists: db.get('books').value()
    });
});

app.get('/books/create', function(req, res) {
    res.render('books/create');
});

app.get('/books/search', function(req, res) {
    var q = req.query.q;
    var searchBook = db.get('books').value();

    var matchedBook = searchBook.filter(function(book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('books/index', {
        lists: matchedBook
    });
});

app.get('/books/:bookId', function(req, res) {
    var id = req.params.id;
    db.get('books').find({ id }).value();
});

app.get('/books/:bookId/update', function(req, res) {
    var id = req.params.bookId;
    var newBook = db.get('books').find({ id }).value();
    console.log(newBook);
    res.render('books/update', {
        book: newBook
    });
})

app.get('/books/:bookId/view', function(req, res) {
    var id = req.params.bookId;
    console.log(req.params);
    var bookInfo = db.get('books').find({ id }).value();
    console.log(bookInfo);
    res.render('books/view', {
        book: bookInfo
    });
});

// app.delete
app.get('/books/:bookId/delete', function(req, res) {
    var id = req.params.bookId;
    db.get('books').remove({ id }).write();
    res.redirect('/books');
});

// POSTS
app.post('/books/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
});

app.post('/books/:bookId/update', function(req, res) {
    var id = req.params.bookId;
    var bookTitle = req.body.title;
    var content = req.body.description;

    db.get('books').find({ id: id }).assign({ title: bookTitle, description: content }).write();

    res.redirect('/books');
});

app.listen(port, function() {
    console.log('app is running on port ' + port);
});