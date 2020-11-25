var express = require('express');
var app = express();

var port = 3000;



app.get('/todo', function(req, res) {
    res.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học tại CodersX</li></ul> ');
});

app.listen(port, function() {
    console.log('Example app listen on port 3000', port);
});