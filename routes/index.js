var express = require('express');
var amadeus = require('../utils/amadeus.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
  amadeus.hotelSearch({},(err,data)=>{
  	console.log(data);
  });
});

module.exports = router;
