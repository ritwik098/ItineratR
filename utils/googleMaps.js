var request = require('request');
var googleMapsKey = require('../config/config.js').googleMapsKey;
var sitaAirportKey = require('../config/config.js').sitaAirportKey;
/*
 * Pass in query parameters as the first parameter
 * Callback takes an error and a body as arguments
 */
function getCoordinatesOfCity(airportName,cb){
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

function getPlaceInfo(airportName,cb){
	var url = "https://airport.api.aero/airport/"+airportName;
	request({ url: url, qs: {user_key : sitaAirportKey} }, function(err, response, body) {
	  	var b = JSON.parse(body);
	    console.log(b);
	    var res = { 
	    	city : b.airports[0].city,
	    	country : b.airports[0].country 
	    }
	    cb(err,res);

	});
}

function getPointsOfInterest(properties,cb){
	
	var url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
	var qr = {
		query : "points of interest in "+properties.cityName,
		key : googleMapsKey
	}
	request({ url: url, qs: qr }, function(err, response, body) {
	    console.log(body);
	    
	    cb(err,body);
	});
	
}

module.exports = {
  getPointsOfInterest : getPointsOfInterest,
  getCoordinatesOfCity : getCoordinatesOfCity,
  getPlaceInfo : getPlaceInfo
}
