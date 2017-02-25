var request = require('request');
var http = require('http');

var amadeusKey = require('../config/config.js').amadeusKey;

/*
 * Pass in query parameters as the first parameter
 * Callback takes an error and a body as arguments
 */
function flightSearch(properties, cb) {
  var url = 'https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search';
  properties.apikey = amadeusKey;
  request({ url: url, qs: properties }, function(err, response, body) {
    var b = JSON.parse(body);
    cb(err, b);
  });
}

function hotelSearch(properties, cb){
	
 		
 		properties.apikey = amadeusKey;
 		var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport'
 		request({ url: url, qs: properties }, function(err, response, body) {
		    var b = JSON.parse(body);
		    console.log(body);
		    cb(err,b);
		});
}

module.exports = {
  flightSearch: flightSearch,
  hotelSearch : hotelSearch
}
