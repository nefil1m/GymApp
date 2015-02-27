var express = require('express');
var app = express();


app.use('/app', express.static(__dirname + '/app'));
app.all('/*', function(req, res) {
  res.sendFile('/app/index.html', { root: __dirname });
});

var server = require('http').createServer(app).listen(7000, function() {
  console.log('Listening 7000');
});