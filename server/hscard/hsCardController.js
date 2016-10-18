var HsCard = require('./hsCardModel');
var Q = require('q');

var findCards = Q.nbind(HsCard.find, HsCard);

exports.getCards = function(req, res) {
  var params = req.url.split('?')[1].slice(1).split('&');
  var query = {};
  params.forEach(function(pair) {
    var [key, value] = pair.split('=');
    query[key] = decodeURIComponent(value);
  });
  if (query.name) {
    query.name = query.name.toLowerCase();
    if (query.partial) {
      query.name = new RegExp(query.name);
    }
  }
  if (query.cost) {
    if (query.cost[0] === '<') {
      query.cost = {$lt: +(query.cost.slice(1))};
    } else if (query.cost[0] === '>') {
      query.cost = {$gt: +(query.cost.slice(1))};
    }
  }
  delete query.partial;
  findCards(query)
  .then(function(cards) {
    res.json(cards);
  })
  .fail(function(err) {
    console.log('error searching database: ', err);
  });
};