var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Itinerary = require('../../models/Itinerary');

/**
 * @api {get} /api/itinerary Get All Itineraries
 * @apiName GetItineraries
 * @apiGroup Itinerary
 * @apiDescription This path gets a list of all itineraries
 * @apiSuccessExample Success-Response
 * [...]
*/
router.get('/', function(req, res, next) {
  Itinerary.find(function(err, doc) {
    if (err)
      return next(err);
    res.json(doc);
  });
});

/**
 * @api {get} /api/itinerary/city/:city Get Itineraries By City
 * @apiName GetCityItineraries
 * @apiGroup Itinerary
 * @apiDescription This path gets a list of all itineraries for a specific city
 * @apiSuccessExample Success-Response
 * [...]
*/
router.get('/city/:city', function(req, res, next) {
  Itinerary.find({ city: req.params.city }, function(err, doc) {
    if (err)
      return next(err);
    res.json(doc);
  });
});

/**
 * @api {post} /api/itinerary Create Itineraries
 * @apiName CreateItineraries
 * @apiGroup Itinerary
 * @apiDescription This path allows creation of itineraries
 * @apiSuccessExample Success-Response
 * [...]
*/
router.post('/', function(req, res, next) {
  Itinerary.create(function(err, doc) {
    if (err)
      return next(err);
    res.json({
      success: true,
      itinerary: doc
    });
  });
});

module.exports = router;
