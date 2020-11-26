var express = require('express');
var app = express();
var path = require('path');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);

var port = 3000;

db.defaults({ users: [], todos: [] }).write()

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

// to do list 



app.get('/todo', function(req, res) {
    res.render('todo/index', {
        lists: db.get('todos').value()
    });
});

app.get('/todo/create', function(req, res) {
    res.render('todo/create');
});


app.post('/todo/create', function(req, res) {
    db.get('todos').push(req.body).write();
    res.redirect('/todo');

});


app.listen(port, function() {
    console.log('Example app listen on port ' + port);
});