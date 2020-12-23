const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    avatar: String,
    phone: String,
    isAdmin: Boolean
}); // schema

var User = mongoose.model('User', userSchema, 'users'); // model

module.exports = User;