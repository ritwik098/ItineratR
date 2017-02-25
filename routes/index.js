var express = require('express');
var amadeus = require('../utils/amadeus.js');
var google = require('../utils/googleMaps.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	/*var body = {
 		location: 'ORD',
 		check_in : '2017-03-15',
 		check_out : '2017-03-19',
 		radius : '42',
 		number_of_results : '10'
 	};
    amadeus.hotelSearch(body,(err,data)=>{
  		console.log(data);
  	});

    google.getPointsOfInterest({cityName: "Paris"}, (err,body)=>{
    	console.log("POINTS OF INTEREST: \n");
    	console.log(body);
    });
	*/
	var responseJSON = {};
	var prop = {
		origin : "BOS",
		departure : "2017-03-15",
		duration : 4,
		max_price : 350
	}
	var totalBudget = prop.max_price;
	prop.max_price -= prop.duration*51; 
	amadeus.flightSearch(prop,(err,data)=>{

		console.log(data.origin);
		data.results.forEach(function(value,i,array){
			var hotelBody = {
				location : data.results[i].destination,
				check_in : data.results[i].departure_date,
				check_out : data.results[i].return_date,
				radius : '42',
				number_of_results : '5'
			};
			amadeus.hotelSearch(hotelBody, (err,hotelRes)=>{
				if(hotelRes.results[0] != undefined){
					var minHotelCost = hotelRes.results[0].total_price.amount;
					if( 1.1*(minHotelCost + (18*prop.duration)) > (prop.max_price - data.results[i].price + 51*prop.duration)){
						responseJSON.destinations = [];
						console.log(data.results[i]);
					}
				}
			});
		});
	});

});

module.exports = router;
