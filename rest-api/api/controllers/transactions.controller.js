var Transaction = require('../../models/transaction.model');


module.exports.index = async function(req, res) {
    try {
        var transactions = await Transaction.find()
            .populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'books.book' });

        //console.log(req.user)

        res.json(transactions);

    } catch (error) {
        console.log(error);
    }

};