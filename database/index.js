var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

app.set('views', './views');
app.set('views', path.resolve(__dirname, './views'));