'use strict';

var mongoose   = require('mongoose');
var ObjectId   = mongoose.Types.ObjectId;

var should = require('should');
var config = require('../config');
var app = require(config.projectRoot + '/app');
var seedData = require('../../seed_data/seedData');
var seedDb = require('../../seed_data/seedDb');
var utils = require('../../seed_data/utils');
var compareutils = require('./utils');
var request = require('supertest');

describe('Admin-delete test: ', function() {

  describe('DELETE /admin/category', function() {
    before(seed);
    after(utils.dropDbAndCloseConnection);

    it('should respond with 204 if request is valid', function(done) {
      request(app)
        .delete('/admin/category?username=admin&password=asd&id=' + seedData[3].data[0]._id)
        .set('Ajax', 'true')
        .expect(204, done);
    });

    it('should respond with 400 if no id is given', function(done) {
      request(app)
        .delete('/admin/category?username=admin&password=asd')
        .set('Ajax', 'true')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "no category id given");
            done();
          }
        });
    });

    it('should respond with 500 if invalid category', function(done) {
      request(app)
        .delete('/admin/category?username=admin&password=asd&id=invalidcategory')
        .set('Ajax', 'true')
        .expect(500)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "database error while finding category");
            done();
          }
        });
    });

    it('should respond with 404 if invalid category', function(done) {
      request(app)
        .delete('/admin/category?username=admin&password=asd&id=000000000000000000000000')
        .set('Ajax', 'true')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "category not found");
            done();
          }
        });
    });

    it('should respond with 401 if username is wrong', function(done) {
      request(app)
        .delete('/admin/category?username=wrongusername&password=asd')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

    it('should respond with 401 if password is wrong', function(done) {
      request(app)
        .delete('/admin/category?username=admin&password=wrongpassword')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

  });

  describe('DELETE /admin/claim', function() {
    before(seed);
    after(utils.dropDbAndCloseConnection);

    var Cookies;
    var claimId;

    // WRONG
    it('should respond with 500 if invalid claim id is given', function(done) {
      request(app)
        .delete('/admin/claim?username=admin&password=asd&claimid=wrongid')
        .set('Ajax', 'true')
        .expect(500)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "database error while finding claim");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 404 if non-existent claim id is given', function(done) {
      request(app)
        .delete('/admin/claim?username=admin&password=asd&claimid=000000000000000000000000')
        .set('Ajax', 'true')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "claim not found");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 401 if username is wrong', function(done) {
      request(app)
        .delete('/admin/claim?username=wrongusername&password=asd')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 401 if password is wrong', function(done) {
      request(app)
        .delete('/admin/claim?username=admin&password=wrongpassword')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 404 if freelancer not found', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${seedData[5].data[0]._id}`)
        .set('Ajax', 'true')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "freelancer not found");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 400 if freelancer is not claimed', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${seedData[5].data[1]._id}`)
        .set('Ajax', 'true')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "freelancer has not been claimed");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 404 if user not found', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${seedData[5].data[2]._id}`)
        .set('Ajax', 'true')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "user not found");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 400 if user is not claiming', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${seedData[5].data[3]._id}`)
        .set('Ajax', 'true')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "user is not claiming");
            done();
          }
        });
    });


    // LOGIN
    it('app should get answer 202 on POST /user/login with correct username and password', function(done) {
      request(app)
      .post('/user/login')
      .send({
        "username" : "MrSatan",
        "password" : "666",
      })
      .expect(202).end(function(err,res) {
        var re = new RegExp('; path=/; httponly', 'gi');
        Cookies = res.headers['set-cookie'].map(function(r) {
            return r.replace(re, '');
          }).join("; ");
        done();
      });
    });

    // MAKE CLAIM
    it('app should get answer 201 on POST /claim/new if everything is correct', function(done) {
      let req = request(app).post('/claim/new');
      req.cookies = Cookies;
      req.expect(201)
      .send({
        freelancerId : seedData[1].data[2]
      })
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("_id");
          if (res.body._id) {
            claimId = res.body._id;
          }
          done();
        }
      });
    });

    // WRONG
    it('should respond with 400 if invalid choice', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${claimId}&choice=wrongchoice&message=abc&email=testemail`)
        .set('Ajax', 'true')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "invalid choice");
            done();
          }
        });
    });

    // CORRECT
    it('should respond with 204 if request is good', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${claimId}&choice=reject&message=abc&email=testemail`)
        .set('Ajax', 'true')
        .expect(204)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    // MAKE CLAIM
    it('app should get answer 201 on POST /claim/new if everything is correct', function(done) {
      let req = request(app).post('/claim/new');
      req.cookies = Cookies;
      req.expect(201)
      .send({
        freelancerId : seedData[1].data[3]
      })
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("_id");
          if (res.body._id) {
            claimId = res.body._id;
          }
          done();
        }
      });
    });

    // CORRECT
    it('should respond with 204 if request is good', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${claimId}&choice=accept&message=abc&email=testemail`)
        .set('Ajax', 'true')
        .expect(204)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

  });

  describe('DELETE /admin/category/document', function() {
    before(seed);
    after(utils.dropDbAndCloseConnection);

    // CORRECT: DELETE: /admin/category/document adds document (res.status: 204)
    it('should respond 204 on DELETE /admin/category/document and delete the document', function(done) {
      // delete "Degree, one of the documents added in the seed"
      request(app)
      .delete('/admin/category/document?username=admin&password=asd&id=58cc4b15fc13ae5ec7000123&docname=Degree')
      .set('Ajax', 'true')
      .expect(204)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          // last test tries to delete doc again, should get 404
          done();
        }
      });
    });

    // ERROR: DELETE: admin/category/document not admin (401)
    it('should respond 401 on DELETE /admin/category/document if not admin', function(done) {
      request(app)
      .delete('/admin/category/document?username=secretly_not_admin&password=pls&id=58cc4b15fc13ae5ec7000123&docname=other')
      .set('Ajax', 'true')
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("error", "wrong username or password")
          done();
        }
      });
    });

    // ERROR: DELETE: admin/category/document no category id (400)
    it('should respond 400 on DELETE /admin/category/document if no category id is given', function(done) {
      request(app)
      .delete('/admin/category/document?username=admin&password=asd&docname=other')
      .set('Ajax', 'true')
      .expect(400)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("error", "no category id given")
          done();
        }
      });
    });

    // ERROR: DELETE: admin/category/document db error category (500)
    it('should respond 401 on DELETE /admin/category/document if category id is invalid', function(done) {
      request(app)
      .delete('/admin/category/document?username=admin&password=asd&id=not_an_objectid&docname=other')
      .set('Ajax', 'true')
      .expect(500)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("error", "database error while finding category")
          done();
        }
      });
    });

    // ERROR: DELETE: admin/category/document categ. not found (404)
    it('should respond 404 on DELETE /admin/category/document if the category is not found', function(done) {
      request(app)
      .delete('/admin/category/document?username=admin&password=asd&docname=other&id=' + new ObjectId())
      .set('Ajax', 'true')
      .expect(404)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("error", "category not found")
          done();
        }
      });
    });

    // ERROR: DELETE: admin/category/document document not found (404)
    it('should respond 404 on DELETE /admin/category/document for non-existing document', function(done) {
      request(app)
      .delete('/admin/category/document?username=admin&password=asd&id=58cc4b15fc13ae5ec7000123&docname=Degree')
      .set('Ajax', 'true')
      .expect(404)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("error", "document 'Degree' not found for category 'Accounting'")
          done();
        }
      });
    });

  });

  describe('DELETE /admin/duplicate', function() {
    before(seed);
    after(utils.dropDbAndCloseConnection);

    var Cookies;
    var claimId;
    var duplicateID;

    // WRONG
    it('should respond with 401 if username is wrong', function(done) {
      request(app)
        .delete('/admin/duplicate?username=wrongusername&password=asd')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

    // WRONG
    it('should respond with 401 if password is wrong', function(done) {
      request(app)
        .delete('/admin/duplicate?username=admin&password=wrongpassword')
        .set('Ajax', 'true')
        .expect(401)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "wrong username or password");
            done();
          }
        });
    });

    // LOGIN
    it('app should get answer 202 on POST /user/login with correct username and password', function(done) {
      request(app)
      .post('/user/login')
      .send({
        "username" : "Fuin",
        "password" : "fooly",
      })
      .expect(202).end(function(err,res) {
        var re = new RegExp('; path=/; httponly', 'gi');
        Cookies = res.headers['set-cookie'].map(function(r) {
            return r.replace(re, '');
          }).join("; ");
        done();
      });
    });

    // MAKE CLAIM
    it('app should get answer 201 on POST /claim/new if everything is correct', function(done) {
      let req = request(app).post('/claim/new');
      req.cookies = Cookies;
      req.expect(201)
      .send({
        freelancerId : seedData[1].data[2]
      })
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          res.body.should.have.property("_id");
          if (res.body._id) {
            claimId = res.body._id;
          }
          done();
        }
      });
    });

    // APPROVE CLAIM
    it('should respond with 204 if request is good', function(done) {
      request(app)
        .delete(`/admin/claim?username=admin&password=asd&claimid=${claimId}&choice=reject&message=abc&email=testemail`)
        .set('Ajax', 'true')
        .expect(204)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    // MAKE DUPLICATE REQUEST
    it('should respond with 201 if request is valid', function(done) {
      let req = request(app).post(`/duplicate`);
      req.cookies = Cookies;
      req.set('ajax', 'true')
        .send({
          originalID : seedData[1].data[0]._id,
          duplicateID : seedData[1].data[1]._id
        })
        .expect(201)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            duplicateID = res.body._id;
            res.body.should.have.property("userID", "590c66f0fc13ae73cd000029");
            res.body.should.have.property("originalID", seedData[1].data[0]._id);
            res.body.should.have.property("duplicateID", seedData[1].data[1]._id);
            done();
          }
        });
    });

    // VALID REQUEST
    it('should respond with 204 if request is valid', function(done) {
      let req = request(app).delete(`/admin/duplicate?username=admin&password=asd&duplicateid=${duplicateID}`);
      req.cookies = Cookies;
      req.set('ajax', 'true')
        .expect(204)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    // INVALID REQUEST
    it('should respond with 404 if duplicate is not found', function(done) {
      let req = request(app).delete(`/admin/duplicate?username=admin&password=asd&duplicateid=${duplicateID}`);
      req.cookies = Cookies;
      req.set('ajax', 'true')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "duplicate not found");
            done();
          }
        });
    });

    // INVALID REQUEST
    it('should respond with 400 if duplicate id is not valid', function(done) {
      let req = request(app).delete(`/admin/duplicate?username=admin&password=asd&duplicateid=invalidformat`);
      req.cookies = Cookies;
      req.set('ajax', 'true')
        .expect(500)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property("error", "database error while finding duplicate");
            done();
          }
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
