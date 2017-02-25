var request = require('request');
var Yelp = require('yelp');
var yk = require('../config/config.js').yelp;

var yelp = new Yelp({
  consumer_key: yk.consumerKey,
  consumer_secret: yk.consumerSecret,
  token: yk.token,
  token_secret: yk.tokenSecret
});

function getResturaunts(props, cb) {
  props.limit = 10;
  props.sort = 2;
  yelp.search(props, cb);
}

module.exports = {
  getResturaunts: getResturaunts
}
