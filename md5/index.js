var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

var bookRoute = require('./routers/book.route');
var userRoute = require('./routers/user.route');
var transactionRoute = require('./routers/transaction.route');
var homeRoute = require('./routers/home.route');
var authRoute = require('./routers/auth.route');


var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(cookieParser());


app.use('/books', authMiddleware.requireAuth, bookRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute);
app.use('/home', authMiddleware.requireAuth, homeRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});