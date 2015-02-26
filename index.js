var express = require('express');
var app = express();


app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/app'));
app.all('/*', function(req, res) {
    res.sendFile('/app/index.html', { root: __dirname });
});

var server = app.listen(7000);