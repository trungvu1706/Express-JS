var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

var todoList = ['Đi chợ ', 'Nấu cơm', 'Rửa bát', 'Học tại CoderX'];

var users = [
    { id: 1, name: 'Trung' },
    { id: 2, name: 'Quang' }
];

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));
// console.log(__dirname); // duong dan cac thu muc

app.get('/todo', function(req, res) {
    res.render('todo/index', {
        lists: todoList // lists:[....]
    });

});

app.get('/todo/search', function(req, res) {
    var q = req.query.q;

    console.log(q)

    var matchedList = todoList.filter(function(ele) {
        return ele.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(matchedList);
    res.render('todo/index', {
        lists: matchedList
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUser = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUser
    });
});

app.listen(port, function() {
    console.log('Server listening on port' + port);
});