var express = require('express');
var app = express();
var path = require('path');
var low = require('lowdb');
var shortid = require('shortid');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);

var port = 3000;

db.defaults({ todos: [] }).write()

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/todo', function(req, res) {
    res.render('todo/index', {
        lists: db.get('todos').value()
    });
});

app.get('/todo/create', function(req, res) {
    res.render('todo/create');
});

app.get('/todo/:id/delete', function(req, res) {
    var id = req.params.id;
    db.get('todos').remove({ id }).write();
    res.redirect('/todo');
});


app.post('/todo/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('todos').push(req.body).write();
    res.redirect('/todo');
});


app.listen(port, function() {
    console.log('Example app listen on port ' + port);
});