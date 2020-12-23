const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    quantity: {
        type: Number,
        default: 1
    }
}); // schema

var Cart = mongoose.model('Cart', cartSchema, 'carts'); // model

module.exports = Cart;