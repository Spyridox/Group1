'use strict';

const mongoose   = require('mongoose');
const ObjectId   = mongoose.Types.ObjectId;
const should = require('should');
const config = require('../config');
const app = require(config.projectRoot + '/app');
const seedData = require('../../seed_data/seedData');
const seedDb = require('../../seed_data/seedDb');
const utils = require('../../seed_data/utils');
const freelanceutils = require('./utils');
const request = require('supertest');

describe('Search test: ', function() {

  describe('GET /search?keyword=', function() {
    before(seed);
    after(utils.dropDb);

    it('Should return the correct data', function(done) {
      request(app)
        .get('/search?keyword=asim')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json')
        .expect(200)
        .end(function(err, res) {
          const results = JSON.parse(res.text) || [];
          results.forEach(function(freelance) {
            freelanceutils.checkSearchInfoInResponse(freelance, seedData[0].data[1]);
          });
          done();
        });
    });

  });
});

function seed(done) {
  //seed the db
  seedDb.seed(function(err, seedData) {
    if (err) return done(err);
    done();
  });
}
