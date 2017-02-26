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
		//console.log(err)
		//console.log(response)
		//console.log(body)
		if (body.results == undefined || body.results.length == 0)
    	return cb({ message: 'Location not found' });
    var loc = body.results[0].geometry.location;
    cb(err, loc);
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

function getPointsOfInterest(properties,cb) {
	var url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
	var qr = {
		query : "tourist attractions or points of interest in "+properties.cityName,
		key : googleMapsKey
	}

	request({ url: url, qs: qr, json: true }, function(err, response, body) {
	    console.log(body.results.length);
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

function calculateDistance(obj1,obj2){
	lat1 = obj1.lat;
	lon1 = obj1.lng;

	lat2 = obj2.lat;
	lon2 = obj2.lng;

	var R = 6371e3; // metres
	var phi1 = deg2rad(lat1);
	var phi2 = deg2rad(lat2);
	var deltaPhi = deg2rad(lat2-lat1);
	var deltaLamda = deg2rad(lon2-lon1);

	var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
	        Math.cos(phi1) * Math.cos(phi2) *
	        Math.sin(deltaLamda/2) * Math.sin(deltaLamda/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getPicture(cityName,cb){
	var url = "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase="+cityName;
	request({ url: url }, function(err, response, body) {
	    //console.log(body);
	    var b = JSON.parse(body);
	    console.log(b);
	    cb(err,b);
	});
}

module.exports = {
  calculateDistance : calculateDistance,
  getPointsOfInterest : getPointsOfInterest,
  getCoordinatesOfCity : getCoordinatesOfCity,
  getPicture : getPicture,
  getCoordinates: getCoordinates,
  getResturaunts: getResturaunts,
  getPlaceInfo : getPlaceInfo
}
