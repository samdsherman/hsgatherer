var fs = require('fs');
var HsCard = require('./hscard/hsCardModel');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hscards');


fs.readFile(__dirname + '/hs.json', function(err, data) {
  if (err) {
    console.log('error reading file: ', err);
  } else {
    console.log('successfully read hs.json');

    var parsedJson = JSON.parse(data.toString('utf8'));

    HsCard.remove({}, function(err) {
      if (err) {
        return console.log('error removing old cards: ', err);
      }
      Object.keys(parsedJson).forEach(function(set) {
        parsedJson[set].forEach(function(card) {
          if (card.type === 'Hero') {
            return;
          }
          card.name = card.name.toLowerCase();
          card.playerClass = card.playerClass || 'Neutral';
          HsCard.create(card);
        });
      });
    });
  }

});
