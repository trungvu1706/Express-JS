const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        lowcase: true // always convert title to lowercase
    },
    description: String
});

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;