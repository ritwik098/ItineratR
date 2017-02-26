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
  request({ url: url, qs: properties, json: true }, function(err, response, body) {
    cb(err, body);
  });
}

function hotelSearch(properties, cb) {
    properties.apikey = amadeusKey;
    var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle';
    request({ url: url, qs: properties, json: true }, function(err, response, body) {
    	if(!(body == undefined)){
    		for(var i = 0; i<body.results.length; i++){
    			if(i==0){
    				body.results[i].recommended = true;
    			}
    			else{
    				body.results[i].recommended = false;
    			}
    		}
    	}
      	cb(err, body);
    });
}

function pointsOfInterest(properties, cb) {
  properties.apikey = amadeusKey;
  var url = 'https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text';
  request({ url: url, qs: properties, json: true }, function(err, response, body) {
    cb(err, body);
  });
}

module.exports = {
  flightSearch: flightSearch,
  hotelSearch : hotelSearch,
  pointsOfInterest: pointsOfInterest
}
