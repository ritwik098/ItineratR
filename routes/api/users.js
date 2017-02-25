var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var User = require('../../models/User');

/**
 * @api {get} /api/users Get All Users
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription This path gets a list of all users
 * @apiSuccessExample Success-Response
 * [...]
*/
router.get('/', (req, res, next) => {
  User.find((err, doc) => {
    if (err)
      return next(err);
    res.json(doc);
  });
});

/**
 * @api {post} /api/users Create User
 * @apiName PostUsers
 * @apiGroup User
 * @apiDescription This path creates a user from request body data
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.post('/', (req, res, next) => {
  User.create(req.body, (err, doc) => {
    if (err)
      return next(err);
    res.json({
      success: true,
      user: doc
    });
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, doc) => {
    if (err)
      return next(err);
    if (doc == undefined) {
      err.status = 400;
      return next(err);
    }
    res.json({
      success: true,
      user: doc
    });
  });
});

/**
 * @api {delete} /api/users/:id Delete Users by ID
 * @apiName DeleteUsersID
 * @apiGroup User
 * @apiDescription This path Deletes a user by passing in the ID to the url
 * @apiExample Example Path:
 *    /api/users/583003f9284d9222bf802777
 * @apiSuccessExample Success-Response
 * {
 *   "success": true
 * }
*/
router.delete('/:id', (req, res, next) => {
  User.remove({ _id: req.params.id }, (err, doc) => {
    if (err)
      return next(err);
    res.json({
      "success": true
    });
  });
});

module.exports = router;
