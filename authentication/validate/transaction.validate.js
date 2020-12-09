var db = require('../db');


module.exports.update = function(req, res, next) {
    var id = req.params.transactionId;
    var newTransaction = db.get('transactions').find({ id }).value();
    if (!newTransaction) {
        return res.send('ID DOES NOT EXIST!');
    };
    next();
};