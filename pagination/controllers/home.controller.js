var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('home/index');
};