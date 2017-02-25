/*
 * This file serves as an interface between our code and the api calls for
 * the Amadeus travel data
 */

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
<<<<<<< Updated upstream
  request({ url: url, qs: properties }, function(err, response, body) {
    var b = JSON.parse(body);
    cb(err, b);
  });
}

function hotelSearch(){
	
 		var bod = {
 		   'apikey' : amadeusKey,
 		   'location': 'ORD',
 		   'check_in' : '2016-11-15',
 		   'check_out' : '2016-11-16',
 		   'radius' : '42'
 		};
 
 
 		var options = {
 		  host: 'api.sandbox.amadeus.com',
 		  path: '/v1.2/hotels/search-circle',
 		  method: 'GET',
 		  body : bod
 		};
 		
 		var REQ = http.request(options, function(res,error) {
 
 		  if(error){
 		  	console.log(error);
 		  }
 		  console.log('STATUS: ' + res.statusCode);
 		  res.setEncoding('utf8');
 		  res.on('data', function (chunk) {
 		    console.log('BODY: ' + chunk);
 		  });
 		});
 		REQ.end();
=======
  request({ url: url, qs: properties, json: true }, function(err, response, body) {
    cb(err, body);
  });
}

function hotelSearch(properties, cb) {
    properties.apikey = amadeusKey;
    var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-circle'
    request({ url: url, qs: properties, json: true }, function(err, response, body) {
      console.log(b);
      cb(err,b);
    });
>>>>>>> Stashed changes
}

module.exports = {
  flightSearch: flightSearch
}
