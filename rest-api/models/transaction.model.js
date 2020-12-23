const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    books: [{
        book: {
            ref: 'Book',
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: Number
    }],

}); // schema

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions'); // model

module.exports = Transaction;