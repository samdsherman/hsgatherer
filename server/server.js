var express = require('express');
var bodyParser = require('body-parser');
var hs = require('./hscard/hsCardController');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hscards');


var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/api/hs', hs.getCards);

app.listen(8000);