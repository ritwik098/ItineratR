var express = require('express');
var path = require('path');
var amadeus = require('../utils/amadeus.js');
var google = require('../utils/googleMaps.js');
var router = express.Router();
var iataDatabase = require('../utils/iata.js').data;
var fs = require('fs');
var bodyParser = require('body-parser');



router.post('/api/sendTravelInformation',function(req,res,next){
	var finalListOfPlaces = [];
	var prop = {
		origin : req.body.origin,
		departure : req.body.departure,
		duration : req.body.duration,
		max_price : req.body.max_price
	}
	var totalBudget = prop.max_price;
	prop.max_price -= prop.duration*51; 
	amadeus.flightSearch(prop,(err,data)=>{
		if(err){
			res.send(err);
		}
		//console.log(data.origin);
		for(var i = 0; i < data.results.length;i++){
			
			var minHotelCost = 80*prop.duration;
			if( (minHotelCost + (18*prop.duration))+ (prop.duration*(minHotelCost + (18*prop.duration))/100)> (prop.max_price - data.results[i].price + 96*prop.duration)){
				var json = data.results[i];
				//console.log(data.results[i].destination);
				var b = iataDatabase;
				for(var index = 0; index< b.response.length; index++){
					//console.log((iataDatabase[i].code).localeCompare(data.results[i].destination));
					if((b.response[index].code).localeCompare(data.results[i].destination)== 0){
						json.city = b.response[index].name;
						json.country = b.response[index].country_code;
						finalListOfPlaces.push(json);
						console.log(finalListOfPlaces[i]);
					}
					//console.log(iataDatabase[index].code);
				}
						
			}
			
		}
		res.send(JSON.stringify(finalListOfPlaces));
	});
});

/* GET home page. */
router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
