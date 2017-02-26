var express = require('express');
var router = express.Router();

var azureml = require('../../utils/azureml');

var User = require('../../models/User');

/**
 * @api {get} /api Root
 * @apiName GetAPIRoot
 * @apiGroup Index
 * @apiDescription This path gets the root of the API
 * @apiSuccessExample Success-Response
 * {
 *   "success": true,
 *   "message":"API Root"
 * }
**/
router.get('/', function(req, res, next) {
  res.json({
    "success": true,
    "message": "API Root"
  });
});

router.post('/login', function(req, res, next) {
  if (req.body == null) {
    return next({
      "success": false,
      "status": 401,
      "message": "Authentication failed"
    });
  }
  User.findOne({ "email": req.body.email }, function(err, user) {
    if (err)
      return next(err);
    if (user.password != req.body.password)
      return next({
        "success": false,
        "status": 401,
        "message": "Authentication failed"
      });
      res.json({
        "success": true,
        "user": user
      });
    });
});



router.post('/recommendcity', function(req, res, next) {
  res.send('');
});

router.use('/users', require('./users'));
router.use('/itinerary', require('./itinerary'));

module.exports = router;
