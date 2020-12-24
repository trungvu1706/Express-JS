require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var bookRoute = require('./routers/book.route');
var userRoute = require('./routers/user.route');
var transactionRoute = require('./routers/transaction.route');
var homeRoute = require('./routers/home.route');
var authRoute = require('./routers/auth.route');
var cartRoute = require('./routers/cart.route');

var apiTransactionRoute = require('./api/routers/transactions.router');
var apiAuth = require('./api/routers/auth.router');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(sessionMiddleware);


app.use('/books', bookRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute);
app.use('/home', authMiddleware.requireAuth, homeRoute);
// app.use('/auth', authRoute);
app.use('/cart', cartRoute);

// from Api folder 
app.use('/api/transactions', apiTransactionRoute);
app.use('/api/auth', apiAuth);


app.listen(port, function() {
    console.log('Server listening on port ' + port);
});