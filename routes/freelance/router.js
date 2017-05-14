/** @module freelance/router */
'use strict';

const express = require('express');
const router = express.Router();
const middleware =  require('../middleware');
const utils = require('../utils');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Freelance = mongoose.model('Freelance');
const Review = mongoose.model('Review');
const User = mongoose.model('User');
const Tag = mongoose.model('Tag');

// Supported methods.
router.all('/', middleware.supportedMethods('GET, POST, PUT, OPTIONS'));
router.all('/new', middleware.supportedMethods('GET, OPTIONS'));
router.all('/:freelanceid', middleware.supportedMethods('GET, PUT, OPTIONS')); //add delete later
router.all('/:freelanceid/availability', middleware.supportedMethods('PUT, OPTIONS')); //add delete later

// GET /freelance/new
router.get('/new', function(req, res, next) {
  if (req.accepts('text/html')) {
    if(req.session.user_id) {
       User.findById(req.session.user_id).exec(function(err, user){
        res.render('freelancer-create', {
          title: "JobAdvisor - Create Freelancer Profile" ,
          logged: true,
          username: user.username,
          userFreelancer: user.freelancer,
          claiming: user.claiming
        });
      });
    } else {
      res.render('freelancer-create', {
        title: "JobAdvisor - Create Freelancer Profile" ,
        logged: false
      });
    }

  } else res.sendStatus(400);
});

router.get('/edit', function(req, res) {
  if (req.accepts('text/html')) {
    if(req.session.user_id) {
       User.findById(req.session.user_id).exec(function(err, user){
         if (err) {
           res.status(500).json({ error : 'error finding user in database' });
         } else if (!user) {
           res.status(404).json({ error : 'user not found' });
         } else if (!user.freelancer || user.freelancer != req.query.freelancer) {
           res.redirect('/');
         } else {
           res.render('freelancer-edit', {
             title: "JobAdvisor - Edit Freelancer Profile" ,
             logged: true,
             username: user.username,
             userFreelancer: user.freelancer,
             claiming: user.claiming
           });
         }
      });
    } else {
      res.render('freelancer-edit', {
        title: "JobAdvisor - Edit Freelancer Profile" ,
        logged: false
      });
      // res.render('freelancer-edit', {
      //   title: "JobAdvisor - Edit Freelancer Profile" ,
      //   logged: true,
      //   username: "MrSatan",
      //   userFreelancer: "58cc4942fc13ae612c000023"
      // });

    }

  } else res.sendStatus(400);
});

// GET freelance/:freelanceid
router.get('/:freelanceid', function(req, res, next) {
  if (ObjectId.isValid(req.params.freelanceid)) {
    // distinguish between raw and ajax GET request (to render page or return JSON)
    if(req.headers.ajax) {
      Freelance.findById(req.params.freelanceid).populate({
        path: 'reviews',
        populate: {
          path: 'reply',
          model: 'Review',
        }
      }).populate('tags category owner').exec(function(err, freelance) {
        if (err) {
          res.status(400).json(utils.formatErrorMessage(err));
        } else if (!freelance) {
          res.status(404).json({
            statusCode: 404,
            message: "Not Found",
          });
        } else {
          utils.addLinks(freelance, "freelance");
          res.json(freelance).end();
        }
      });
    } else if (req.accepts('text/html')) {
      if(req.session.user_id) { // logged in user
        User.findById(req.session.user_id).exec(function(err, user){
          res.render('freelancer', {
    				title: "JobAdvisor",
            logged: true,
            username: user.username,
            userFreelancer: user.freelancer,
    			});
        });
      } else {
        res.render('freelancer', {
  				title: "JobAdvisor",
          logged: false
  			});
      }
    } else res.sendStatus(400);
  } else res.sendStatus(400);
});

// POST freelance/:freelanceid/review/:replyingid
router.post('/:freelanceid/review', function(req, res, next) {
  const newReview = new Review(req.body);
  if (ObjectId.isValid(req.params.freelanceid)) {
    if (newReview.reply) {
      // newReview is a reply, so add it to the database as a review and put it into the corresponding review
      Review.findById(newReview.reply).exec(function(err, review) {
        if (err) return next(err);
        if (!review) {
          res.status(404).json({
            message: "Trying to reply to a non-existent review."
          });
        } else {
          newReview.reply = undefined;
          newReview.save(function(err, saved) {
            if (err) {
              res.status(400).json(utils.formatErrorMessage(err));
            } else {
              review.reply = newReview;
              review.save(function(err, saved) {
                if (err) {
                  res.status(400).json({
                    message: "Could not save Review in Freelance."
                  });
                } else {
                  res.status(201).json(saved);
                }
              })
            }
          })
        }
      })
    } else {
      Freelance.findById(req.params.freelanceid).exec(function(err, freelance) {
      if (err) return next(err);
      if (!freelance) {
        res.status(404).json({
          message: "Freelance not found with the given id."
        });
      } else {
        // newReview is a review, therefore add a new review to the database and to the array of reviews of the corresponding freelance
        newReview.save(function(err, saved) {
          if (err) {
            res.status(400).json(utils.formatErrorMessage(err));
          } else {
            // res.status(201).json(saved);
            freelance.reviews.push(newReview);
            freelance.save(function(err, saved) {
              if (err) {
                res.status(400).json({
                  message: "Could not save Review in Freelance."
                });
              } else {
                res.status(201).json(saved);
              }
            });
          }
        });
      }
    });
    }
  } else {
    res.sendStatus(400);
  }
});

// PUT freelance/:freelanceid/availability/
router.put('/:freelanceid/availability', function(req, res, next) {
  let req_array = req.body;
  let days_array = [];

  // check if the request is valid
  if (!req_array.every(function(day) {
    return (
      day.day
      && day.begin
      && day.end
      && day.location
      // Checked using conversion to Date, but saved as a string
      && (new Date (day.day) instanceof Date)
      && (!isNaN((new Date (day.day)).valueOf()))
      && (new Date (day.begin) instanceof Date)
      && (!isNaN((new Date (day.begin)).valueOf()))
      && (new Date (day.end) instanceof Date)
      && (!isNaN((new Date (day.end)).valueOf()))
      && (typeof day.location === 'string')
      && (days_array.push(day))
    );
  })) {
    res.status(400).end();
  } else {
    Freelance.findById(req.params.freelanceid).exec(function(err, freelance) {
      if (err) res.status(500).json(utils.formatErrorMessage(err));
      else if (!freelance) {
        res.status(404).json({
          message: "Freelance not found with the given id."
        });
      } else {
        freelance.availability = days_array;
        freelance.save(function (err, updated) {
          if (err) {
            res.status(500).json(utils.formatErrorMessage(err));
          }
          else {
            res.status(204).end();
          }
        });
      }
    });
  }
});


// POST freelance/
router.post('/', function(req, res, next) {
  let tags = req.body.tags.split(',');
  let parameters = req.body;
  delete parameters.tags;
  const newFreelance = new Freelance(parameters);
  // Save Freelance to get its id.
  newFreelance.save(function(err, saved) {
    if (err) {
      res.status(400).json(utils.formatErrorMessage(err));
    }
    // Now we can parse, create and save the tags.
    let tagObjects = [];
    let count = 0;
    console.log("we have got " + count);
    for (let tag in tags) {
      const newTag = new Tag({
        tagName: tag,
      });
      newTag.freelancers.push(saved);
      newTag.save(function(errTag, savedTag) {
        if (err) {
          res.status(400).json(utils.formatErrorMessage(errTag));
        }
        console.log("pushing to saved: " + JSON.stringify(savedTag));
        saved.tags.push(savedTag);
        count++;
        if (tags.length == count) {
          sendResponse();
        }
        console.log("new saved: " + JSON.stringify(saved));
      });
    }
    
    function sendResponse() {
      console.log("saved: " + JSON.stringify(saved));
      saved.save(function(err, saved2) {
        console.log("saved all! " + JSON.stringify(saved2));
        res.status(201).json(saved2);
      });
    }
  });
  
  
  console.log("freelance: "+ JSON.stringify(req.body));
  
});

module.exports = router;
