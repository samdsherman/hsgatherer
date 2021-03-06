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
  if (query.partial) {
    if (query.name) {
      query.name = new RegExp(query.name, 'i');
    }
    if (query.text) {
      query.text = new RegExp(query.text, 'i');
    }
    if (query.race) {
      query.race = new RegExp(query.race, 'i');
    }
  }
  if (query.cost) {
    if (query.cost[0] === '<') {
      query.cost = {$lt: +(query.cost.slice(1))};
    } else if (query.cost[0] === '>') {
      query.cost = {$gt: +(query.cost.slice(1))};
    }
  }
  if (query.health) {
    if (query.health[0] === '<') {
      query.health = {$lt: +(query.health.slice(1))};
    } else if (query.health[0] === '>') {
      query.health = {$gt: +(query.health.slice(1))};
    }
    query.health = {$in: [query.health, null]};
  }
  if (query.attack) {
    if (query.attack[0] === '<') {
      query.attack = {$lt: +(query.attack.slice(1))};
    } else if (query.attack[0] === '>') {
      query.attack = {$gt: +(query.attack.slice(1))};
    }
    query.attack = {$in: [query.attack, null]};
  }
  if (query.durability) {
    if (query.durability[0] === '<') {
      query.durability = {$lt: +(query.durability.slice(1))};
    } else if (query.durability[0] === '>') {
      query.durability = {$gt: +(query.durability.slice(1))};
    }
    query.durability = {$in: [query.durability, null]};
  }
  if (query.playerClass) {
    var classes = query.playerClass.split(',');
    query.playerClass = {$in: classes};
  }
  if (query.cardSet) {
    var sets = query.cardSet.split(',');
    query.cardSet = {$in: sets};
  }
  if (query.type) {
    var types = query.type.split(',');
    query.type = {$in: types};
  }
  if (query.rarity) {
    var rarities = query.rarity.split(',');
    query.rarity = {$in: rarities};
  }
  delete query.partial;

  console.log(query);
  findCards(query)
  .then(function(cards) {
    res.json(cards);
  })
  .fail(function(err) {
    console.log('error searching database: ', err);
  });
};