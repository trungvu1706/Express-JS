var User = require('../models/user.model');
var Book = require('../models/book.model');
var Transaction = require('../models/transaction.model');

module.exports.index = async function(req, res) {
    try {
        var transactions = await Transaction.find()
            .populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'books.book' })

        //se console.log(req.user)

        res.render('transactions/index', {
            transactions,
            userLogin: req.user
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports.create = async function(req, res) {

    try {
        var books = await Book.find();
        var users = await User.find();
        res.render('transactions/create', {
            books,
            users
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports.update = async function(req, res) {

    try {
        var id = req.params.transactionId;
        var transaction = await Transaction.findOne({ _id: id });

        // null or undefined

        var books = await Book.find();
        var users = await User.find();

        res.render('transactions/update', {
            transaction,
            books,
            users
        });

    } catch (error) {
        console.log(error);
    }

};

module.exports.postCreate = async function(req, res) {

    try {
        req.body.isComplete = false;
        req.body.books = [{
            book: req.body.bookId,
            quantity: req.body.quantity
        }];

        delete req.body.bookId
        delete req.body.quantity

        var transaction = new Transaction(req.body);
        await transaction.save();

        res.redirect('/transactions');

    } catch (error) {
        console.log(error);
    }

};

module.exports.postUpdate = async function(req, res) {

    try {
        var id = req.params.transactionId;
        req.body.isComplete = JSON.parse(req.body.isComplete);

        await Transaction.updateOne({ _id: id }, req.body);

        res.redirect('/transactions');

    } catch (error) {
        console.log(error);
    }

}