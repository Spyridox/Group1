'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

module.exports = {

  // Create JSON error message in case mongoose fails.
  formatErrorMessage : function(err) {
    let reason = err.message;
    let errorKeys = Object.keys(err.errors);
    let errorJSON = { "reason" : reason };
    let errors = [];
    for (let error of errorKeys) {
      errors.push(err.errors[error].message);
    }
    errorJSON.errors = errors;
    return errorJSON;
  },

  // Add self link to returned object
  addLinks : function(object, type) {
    object.links = [{
      "rel" : "self",
      "href" : config.url + "/" + type + "/" + object._id
    }];
  },

  searchInTags : function(regex, done) {
    var freelancer_ids = [];
    Tag.find({ tagName : regex }).exec(function(err, results) {
      if (results) {
        results.forEach(function(tag) {
          tag.freelancers.forEach(function(id) {
            freelancer_ids.push(id);
          });
        });
      }
      done(freelancer_ids);
    });
  }

}
