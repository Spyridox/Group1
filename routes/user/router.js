/** @module category/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const utils = require('../utils');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User');

// Supported methods.
router.all('/', middleware.supportedMethods('POST, OPTIONS'));
router.all('/:username', middleware.supportedMethods('GET, PUT, OPTIONS'));


// POST /user
router.post('/', function(req, res, next) {
  const newUser = new User(req.body);
  utils.checkUsername(req.body, function(ok) {
    if (!ok) {
      let err = {
        "message" : "Existing username",
        "errors" : {
          "1" : {
            "message" : "Username `" + req.body.username + "` is already in use.",
          },
        },
      }
      res.status(409).json(utils.formatErrorMessage(err));

    }
    else {
      newUser.save(function(err, saved) {
        if (err) {
          res.status(400).json(utils.formatErrorMessage(err));
        }
        else {
          let createdUser = Object.create(saved);
          createdUser.password = undefined;
          res.status(201).json(createdUser);
        }
      });
    }
  });
});

module.exports = router;
