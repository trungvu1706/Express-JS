var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

var users = [
    { id: 1, name: 'Trung' },
    { id: 2, name: 'Quang' }
];

var todoList = [
    { id: 1, act: 'go shopping' },
    { id: 2, act: 'workout' },
    { id: 3, act: 'learning code' }
];

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect('/users');
});

// to do list




app.get('/todo', function(req, res) {
    res.render('todo/index', {
        lists: todoList
    });

});

app.get('/todo/create', function(req, res) {
    res.render('todo/create');
});

app.post('/todo/create', function(req, res) {
    todoList.push(req.body);
    res.redirect('/todo');
});

app.listen(port, function() {
    console.log('Example app listen on port ' + port);
});