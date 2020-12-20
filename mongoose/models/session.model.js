const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({

}); // schema

var Session = mongoose.model('Session', sessionSchema, 'sessions'); // model

module.exports = Session;