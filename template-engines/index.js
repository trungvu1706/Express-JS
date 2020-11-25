var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/todo', function(req, res) {
    res.render('todo');
})

app.listen(port, function() {
    console.log('Server listening on port' + port);
});