var Book = require('../models/book.model');

module.exports.index = async function(req, res) {
    try {
        var books = await Book.find();

        res.render('books/index', {
            books
        })
    } catch (error) {
        console.log(error);
    }

};

module.exports.create = function(req, res) {
    res.render('books/create');
};
//await Book.find({ title: new RegExp(q) })

module.exports.search = async function(req, res) {
    try {
        var q = req.query.q;
        var books = await Book.find({ title: { $regex: q, $options: 'i ' } });

        res.render('books/index', {
            books
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports.update = async function(req, res) {
    try {
        var id = req.params.bookId;
        var book = await Book.findOne({ _id: id });

        res.render('books/update', {
            book
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports.view = async function(req, res) {
    try {
        var id = req.params.bookId;
        var book = await Book.findOne({ _id: id });

        res.render('books/view', {
            book
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports.delete = async function(req, res) {
    try {
        var id = req.params.bookId;
        await Book.deleteOne({ _id: id });

        res.redirect('/books');

    } catch (error) {
        console.log(error);
    }

};

module.exports.postCreate = async function(req, res) {
    try {
        var book = new Book(req.body)
        await book.save(); // luu vao db

        res.redirect('/books');
    } catch (error) {
        console.log(error);
    }

};

module.exports.postUpdate = async function(req, res) {
    try {
        var id = req.params.bookId;
        await Book.update({ _id: id }, req.body);
        res.redirect('/books');

    } catch (error) {
        console.log(error);
    }
};