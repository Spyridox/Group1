/** @module root/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var rootUrl = require("../../config").url;


// supported methods
router.all('/', middleware.supportedMethods('GET, OPTIONS'));

// list users
router.get('/', function(req, res, next) {
  if (req.accepts('text/html')) {
    res.render('index', {
      title: "JobAdvisor",
    });
  }
  else {
    res.sendStatus(404);
  }
});

// to test freelancer view
router.get('/:id', function(req, res, next) {
  if (req.accepts('text/html')) {
    res.render('freelancer', {
      title: "JobAdvisor",
    });
  }
  else {
    res.sendStatus(404);
  }
});


/** router for /users */
module.exports = router;
