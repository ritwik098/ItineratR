var express = require('express');
var amadeus = require('../utils/amadeus.js');
var google = require('../utils/googleMaps.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	/*
	var body = {
 		location: 'WAS',
 		check_in : '2017-03-15',
 		check_out : '2017-03-19',
 		radius : '50',
 		number_of_results : '3',
 		show_sold_out : true
 	};
    amadeus.hotelSearch(body,(err,data)=>{
  		console.log(data);
  	});

    google.getPointsOfInterest({cityName: "Paris"}, (err,body)=>{
    	console.log("POINTS OF INTEREST: \n");
    	console.log(body);
    });
	*/
	
	
});

router.get('/sendTravelInformation',function(req,res,next){
	var finalListOfPlaces = [];
	var prop = {
		origin : "BOS",
		departure : "2017-03-15",
		duration : 4,
		max_price : 450
	}
	var totalBudget = prop.max_price;
	prop.max_price -= prop.duration*51; 
	amadeus.flightSearch(prop,(err,data)=>{

		//console.log(data.origin);
		data.results.forEach(function(value,i,array){
			var hotelBody = {
				location : data.results[i].destination,
				check_in : data.results[i].departure_date,
				check_out : data.results[i].return_date,
				radius : '42',
				number_of_results : '5'
			};
			
			var minHotelCost = 80*prop.duration;
			if( (minHotelCost + (18*prop.duration))+ (prop.duration*(minHotelCost + (18*prop.duration))/100)> (prop.max_price - data.results[i].price + 96*prop.duration)){
				finalListOfPlaces.push(data.results[i]);
				console.log(data.results[i]);
			}
			
		});
	});
});

module.exports = router;
