var request = require('request');
var googleMapsKey = require('../config/config.js').googleMapsKey;
var sitaAirportKey = require('../config/config.js').sitaAirportKey;
/*
 * Pass in query parameters as the first parameter
 * Callback takes an error and a body as arguments
 */
function getCoordinatesOfCity(airportName,cb) {
	var url = "https://airport.api.aero/airport/"+airportName;
	request({ url: url, qs: {user_key : sitaAirportKey} }, function(err, response, body) {
	    console.log(body);
	    var res = { 
	    	lat : body.airports[0].lat,
	    	lng : body.airports[0].lng 
	    }
	    cb(err,res);
	});
}

function getCoordinates(address, cb) {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json';
	var properties = {
		address: address,
		key: googleMapsKey
	}
	request({ url: url, qs: properties, json: true }, function(err, response, body) {
		if (body.results == undefined || body.results.length == 0)
    	return cb({ message: 'Location not found' });
    var loc = body.results[0].geometry.location;
    cb(err, loc);
	});
}

function getPointsOfInterest(properties,cb) {
	var url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
	var qr = {
		query : "points of interest in "+properties.cityName,
		key : googleMapsKey
	}

	request({ url: url, qs: qr, json: true }, function(err, response, body) {
	    //console.log(body);
	    cb(err,body);
	});
}

function getResturaunts(properties, cb) {
	var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	properties.key = googleMapsKey;
	properties.type = 'restaurant';
	request({ url: url, qs: properties, json: true }, function(err, response, body) {
		cb(err, body);
	});
}

module.exports = {
  getPointsOfInterest : getPointsOfInterest,
  getCoordinatesOfCity : getCoordinatesOfCity,
  getCoordinates: getCoordinates,
  getResturaunts: getResturaunts
}
