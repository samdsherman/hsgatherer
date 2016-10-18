var mongoose = require('mongoose');

var HsCardSchema = new mongoose.Schema({
  cardId: String,
  name: String,
  cardSet: String,
  type: String,
  faction: String,
  rarity: String,
  cost: Number,
  attack: Number,
  health: Number,
  durability: Number,
  text: String,
  flavor: String,
  artist: String,
  collectible: Boolean,
  elite: Boolean,
  race: String,
  playerClass: {
    type: String,
    default: 'Neutral'
  },
  howToGet: String,
  howToGetGold: String,
  img: String,
  imgGold: String,
  locale: String,
  mechanics: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('HsCard', HsCardSchema);