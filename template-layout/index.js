var express = require('express');
var app = express();
var path = require('path');

var bookRoute = require('./routers/book.route');
var userRoute = require('./routers/user.route');
var transactionRoute = require('./routers/transaction.route');
var homeRoute = require('./routers/home.route');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);
app.use('/home', homeRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});