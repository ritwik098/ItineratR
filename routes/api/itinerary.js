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

module.exports = router;
