var express = require('express');
var path = require('path');
var amadeus = require('../utils/amadeus.js');
var google = require('../utils/googleMaps.js');
var router = express.Router();
var iataDatabase = require('../utils/iata.js').data;
var fs = require('fs');
var bodyParser = require('body-parser');
var scrapeImage = require('../utils/scrapeImage.js').scrapeImage;


router.post('/api/sendTravelInformation',function(req,res,next){
	var finalListOfPlaces = [];
	var org = '';
	var imgurl;
	var city = req.body.origin;
	
	for(var i = 0; i< iataDatabase.response.length; i++){
		
		if((iataDatabase.response[i].name).localeCompare(req.body.origin) == 0){
			org = iataDatabase.response[i].code;
			break;
		}
	}
	console.log(org);
	var prop = {
		origin : org,
		departure : req.body.departure,
		duration : req.body.duration,
		max_price : req.body.max_price
	}
	var totalBudget = prop.max_price;
	prop.max_price -= prop.duration*51; 
	amadeus.flightSearch(prop,(err,data)=>{
		if(err){
			res.sendStatus(400);
		}
		//console.log(data.origin);
		if(data.results == undefined){
			res.sendStatus(400);
		}
		else{
			for(var i = 0; i < data.results.length;i++){
				
				var minHotelCost = 80*prop.duration;
				if( (minHotelCost + (18*prop.duration))+ (prop.duration*(minHotelCost + (18*prop.duration))/100) > (prop.max_price - data.results[i].price + 76*prop.duration)){
					var json = data.results[i];
					//console.log(data.results[i].destination);
					var b = iataDatabase;
					for(var index = 0; index< b.response.length; index++){
						//console.log((iataDatabase[i].code).localeCompare(data.results[i].destination));
						if((b.response[index].code).localeCompare(data.results[i].destination)== 0){
							json.city = b.response[index].name;
							json.country = b.response[index].country_code;
							console.log(json.city);
							json.departingCode = org;
							finalListOfPlaces.push(json);
							console.log(json);
						}
						//console.log(iataDatabase[index].code);
					}
							
				}
				
			}
			res.send(JSON.stringify(finalListOfPlaces));
		}
		
	});
});

router.post('/api/getImage',function(req,res,next){
	var name = req.body.city;
	scrapeImage(name,(err,data)=>{
		console.log(data);
		res.send(data);
	});

});

router.post('/api/sendHotels',function(req,res,next){
	

	google.getCoordinates(req.body.city,(err,coord)=>{
		if(err){
			console.log(err);
		}
		var prop = {
			latitude : coord.lat,
			longitude : coord.lng,
			radius : "50",
			check_in : req.body.check_in,
			check_out : req.body.check_out
		}

		amadeus.hotelSearch(prop,(err,data)=>{
			if(err){
				console.log(err);
				res.sendStatus(400);
			}
			else{
				console.log(data);
				res.send(data);
			}
		});
	});
		
});

/* GET home page. */
router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
