let mongoose = require("mongoose"); // import mongoose
let {
  field
} = require('../models'); // import movie models

//Require the dev-dependencies
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual server to get/post/put/delete
let server = require('../index'); // import app from index
let should = chai.should(); // import assert should from chai
let authentication_key; // movie_id declaration

chai.use(chaiHttp); // use chaiHttp

describe('Field', () => {

  describe('/GET user', () => {
    it('it should GET all the user', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/field')
        .end((err, res) => {
          res.should.have.status(200); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('status'); // Body Response should have 'status' property
          res.body.should.have.property('data'); // Body Response should have 'data' property
          res.body.data.should.be.an('array'); // Body Response .data should be an array
          done();
        });
    });
  });

  after((done) => { //Before each test we empty the database
    field.remove({}, (err) => {
      done();
    });
  });
});
