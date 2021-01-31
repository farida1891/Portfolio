let mongoose = require("mongoose"); // import mongoose
let {
  user
} = require('../models'); // import movie models

//Require the dev-dependencies
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual server to get/post/put/delete
let server = require('../index'); // import app from index
let should = chai.should(); // import assert should from chai
let authentication_key; // movie_id declaration

chai.use(chaiHttp); // use chaiHttp

describe('User', () => {
  let userVisitor_id = '5febc3779bdaf76fc97af848';
  let userAdmin_id = '5febc3779bdaf76fc97af849';

  describe('/POST Sign Up', () => {
    it('It should make user and get authentication_key (jwt)', (done) => {
      chai.request(server)
        .post('/signup')
        .send({
          fullname: 'elia ramadhini',
          username: 'elia_visitor1',
          email: 'elia_visitor1@gmail.com',
          password: '1234567890',
          passwordConfirmation: '1234567890',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Sign up success!');
          res.body.should.have.property('token');
          done();
        })
    })
    it('It should be error, because username and email already exist', (done) => {
      chai.request(server)
        .post('/signup')
        .send({
          fullname: 'elia ramadhini',
          username: 'elia_visitor1',
          email: 'elia_visitor1@gmail.com',
          password: '1234567890',
          passwordConfirmation: '1234567890',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors')
          done();
        })
    })
  })

  describe('/POST Sign in', () => {
    it('It should make user sign in and get authentication_key (jwt)', (done) => {
      chai.request(server)
        .post('/signin')
        .send({
          email: 'elia_visitor1@gmail.com',
          password: '1234567890'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Sign in success!');
          res.body.should.have.property('token');
          authentication_key_visitor = res.body.token;
          done();
        })
    })
    it('It should be error, because password was wrong', (done) => {
      chai.request(server)
        .post('/signin')
        .send({
          email: 'elia_visitor1@gmail.com',
          password: '123456789'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          done();
        })
    })
    it('It should be error, because email doesnt exist', (done) => {
      chai.request(server)
        .post('/signin')
        .send({
          email: 'elia_visit@gmail.com',
          password: '1234567890'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          done();
        })
    })

  })

  describe('/POST Sign Up', () => {
    it('It should make user and get authentication_key (jwt)', (done) => {
      chai.request(server)
        .post('/signup')
        .send({
          fullname: 'elia ramadhini',
          username: 'elia_admin1',
          email: 'elia_admin1@gmail.com',
          password: '1234567890',
          passwordConfirmation: '1234567890',
          role: 'admin'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Sign up success!');
          res.body.should.have.property('token');
          done();
        })
    })
  })

  describe('/POST Sign in', () => {
    it('It should make user sign in and get authentication_key (jwt)', (done) => {
      chai.request(server)
        .post('/signin')
        .send({
          email: 'elia_admin1@gmail.com',
          password: '1234567890'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Sign in success!');
          res.body.should.have.property('token');
          authentication_key_admin = res.body.token;
          done();
        })
    })
  })

  describe('/GET user', () => {
    it('it should GET all the user', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/user')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
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

  describe('/GET/:id user', () => {
    it('it should GET an user by id', (done) => {
      chai.request(server)
        .get('/user/' + userVisitor_id)
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('_id').eql(userVisitor_id);
          done();
        })
    });
    it('it should be error, becaue user\'s id doesnt exist', (done) => {
      chai.request(server)
        .get('/user/5ff14910b5997e26688ad851')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE an user by user\'s id', (done) => {
      chai.request(server)
        .put('/user/edit/' + userVisitor_id)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          fullname: 'elia ramadhini',
          username: 'elia_visitor_update',
          email: 'elia_visitor_update@gmail.com',
          password: '1234567890',
          passwordConfirmation: '1234567890',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('_id').eql(userVisitor_id);
          done();
        });
    });
    it('it should be an error, because username already exist', (done) => {
      chai.request(server)
        .put('/user/edit/' + userVisitor_id)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          fullname: 'elia ramadhini',
          username: 'elia_admin',
          email: 'elia_visitor_update@gmail.com',
          password: '1234567890',
          passwordConfirmation: '1234567890',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
  });

  describe('/DELETE/:id user', () => {
    it('it should DELETE an user by user\'s id', (done) => {
      chai.request(server)
        .delete('/user/delete/5ff1db688438c2398858d88b')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data').eql(null);
          done();
        });
    });
    it('it should be an error, because user\'s id doesnt exist', (done) => {
      chai.request(server)
        .delete('/user/delete/5ff1db688438c2398858d881')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
  });

  // after((done) => { //Before each test we empty the database
  //     user.remove({}, (err) => {
  //       done();
  //     });
  //   })

});


describe('Movie', () => {

  /*
   * Test the /POST route
   */
  describe('/POST movie', () => {
    it('it should POST a movie', (done) => {
      chai.request(server)
        .post('/movie/create')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .send({
          title: `vvvvvvvcvvcddcc`,
          genre: 'drama, thriller',
          runtime: '108',
          release: '17 December 2010',
          rated: 'R',
          cast: 'Natalie Portman, Mila Kunis, Vincent Cassel',
          imdb_rating: 9,
          synopsis: 'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
          director: 'Darren Aronofsky',
          writer: 'Mark Heyman (screenplay), Andres Heinz (screenplay) (as Andrés Heinz)'
        })
        .end((err, res) => {
          res.should.have.status(200); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('status'); // Body Response should have 'status' property
          res.body.should.have.property('data'); // Body Response should have 'data' property
          res.body.data.should.be.an('object'); // Body Response .data should be an array
          res.body.data.should.have.property('_id'); // data {_id: ....}
          movie_id = res.body.data._id;
          done()
        })
    })
    it('it should error POST a movie, because title is null', (done) => {
      chai.request(server)
        .post('/movie/create')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .send({
          genre: 'drama, thriller',
          runtime: '108',
          release: '17 December 2010',
          rated: 'R',
          cast: 'Natalie Portman, Mila Kunis, Vincent Cassel',
          imdb_rating: 9,
          synopsis: 'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
          director: 'Darren Aronofsky',
          writer: 'Mark Heyman (screenplay), Andres Heinz (screenplay) (as Andrés Heinz)'
        })
        .end((err, res) => {
          res.should.have.status(422); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.an('object'); // Body Response .data should be an array
          done()
        })
    })
  })

  /*
   * Test the /GET route
   */
  describe('/GET movie', () => {
    it('it should GET all the movie', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/movie')
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

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id movie', () => {
    it('it should GET a movie', (done) => {
      chai.request(server)
        .get('/movie/' + movie_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          done();
        })
    });
    it('it should be an error, because movie\'s id doesnt exist', (done) => {
      chai.request(server)
        .get('/movie/5ff14910b5997e26688ad851')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  /*
   * Test the /GET/title/:title route
   */
  describe('/GET/title/:title movie', () => {
    it('it should GET a movie by title', (done) => {
      chai.request(server)
        .get('/movie/title/Black')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          done();
        })
    });

    it('it should be an error, because title doesnt exist', (done) => {
      chai.request(server)
        .get('/movie/title/blackzz')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  /*
   * Test the /GET/genre/:genre route
   */
  describe('/GET/genre/:genre movie', () => {
    it('it should GET a movie by genre', (done) => {
      chai.request(server)
        .get('/movie/genre/Drama')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          done();
        })
    });

    it('it should be an error, because genre doesnt exist', (done) => {
      chai.request(server)
        .get('/movie/genre/Dramaa')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });


  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id movie', () => {
    it('it should UPDATE a movie by id', (done) => {
      let moviePut = {
        title: `Black Swan ddss`,
        genre: 'drama, thriller',
        runtime: '108',
        release: '17 December 2010',
        rated: 'R',
        cast: 'Natalie Portman, Mila Kunis, Vincent Cassel',
        imdb_rating: 9,
        siteRating: 9,
        synopsis: 'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
        director: 'Darren Aronofsky',
        writer: 'Mark Heyman (screenplay), Andres Heinz (screenplay) (as Andrés Heinz)'
      }
      chai.request(server)
        .put('/movie/update/' + movie_id)
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .send(moviePut)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('_id').eql(movie_id);
          done();
        });
    });
    it('it should be an error, because movie\'s name already exist', (done) => {
      let moviePut = {
        title: `Black Swan`,
        genre: 'drama, thriller',
        runtime: '108',
        release: '17 December 2010',
        rated: 'R',
        cast: 'Natalie Portman, Mila Kunis, Vincent Cassel',
        imdb_rating: 9,
        synopsis: 'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
        director: 'Darren Aronofsky',
        writer: 'Mark Heyman (screenplay), Andres Heinz (screenplay) (as Andrés Heinz)'
      }
      chai.request(server)
        .put('/movie/update/' + movie_id)
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .send(moviePut)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id movie', () => {
    it('it should DELETE a movie by id', (done) => {
      chai.request(server)
        .delete('/movie/delete/' + movie_id)
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data').eql(null);
          done();
        });
    });
  });
});

describe('Review', () => {


  /*
   * Test the /POST route
   */
  describe('/POST review', () => {
    it('it should POST a review', (done) => {
      let movieID = '5feb4f0ea8a8b720ef0d8000'
      chai.request(server)
        .post(`/review/${movieID}/create`)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          review: 'ini sangat bagus',
          rating: 9
        })
        .end((err, res) => {
          res.should.have.status(200); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('status'); // Body Response should have 'status' property
          res.body.should.have.property('data'); // Body Response should have 'data' property
          res.body.data.should.be.a('object'); // Body Response .data should be an array
          review_id = res.body.data._id
          done()
        })
    })
    it('it should be an error, because review is null', (done) => {
      let movieID = '5feb4f0ea8a8b720ef0d8000'
      chai.request(server)
        .post(`/review/${movieID}/create`)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          rating: 9
        })
        .end((err, res) => {
          res.should.have.status(422); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors');
          done()
        })
    })
  })

  /*
   * Test the /GET route
   */
  describe('/GET review', () => {
    it('it should GET all the review', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/review')
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

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id review', () => {
    it('it should GET a review by id', (done) => {
      chai.request(server)
        .get('/review/' + review_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('_id').eql(review_id);
          done();
        })
    });
    it('it should be an error, becaue review\'s id doesnt exist', (done) => {
      chai.request(server)
        .get('/review/5ff1c59ba98ca02a3fa7e42d')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/user/:user review', () => {
    it('it should GET a review by user', (done) => {
      chai.request(server)
        .get('/review/user/elia_visitor1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          done();
        })
    });
    it('it should be an error, because user doesnt exist', (done) => {
      chai.request(server)
        .get('/review/user/elia_visitor9')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/movie/:movie review', () => {
    it('it should GET a review by movie', (done) => {
      chai.request(server)
        .get('/review/movie/Minari')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          done();
        })
    });
    it('it should be an error. because movie\'s name doesnt exist!', (done) => {
      chai.request(server)
        .get('/review/movie/contoh')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        })
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/update/:id review', () => {
    it('it should UPDATE a movie given the id', (done) => {
      chai.request(server)
        .put('/review/update/' + review_id)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          review: 'ini cukup bagus',
          rating: 7
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          done();
        });
    });
    it('it should be an error, because review\'s id doesnt exist', (done) => {
      chai.request(server)
        .put('/review/update/5ff179b87791d65f485c6502')
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .send({
          review: 'ini cukup bagus',
          rating: 7
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id review', () => {
    it('it should DELETE a review given the id', (done) => {
      chai.request(server)
        .delete(`/review/delete/${review_id}`)
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data').eql(null);
          done();
        });
    });
    it('it should be an error, because review\'s id doesnt exist', (done) => {
      chai.request(server)
        .delete('/review/delete/5ff179b87791d65f485c6502')
        .set({
          Authorization: `Bearer ${authentication_key_admin}`
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
  });
  // after((done) => { //Before each test we empty the database
  //   user.remove({}, (err) => {
  //     done();
  //   });
  //     review.remove({}, (err) => {
  //       done();
  //     });
  //   movie.remove({}, (err) => {
  //     done();
  //   });
  // });
});

describe('Watchlist', () => {

  describe('/POST watchlist', () => {
    it('it should ADD a watchlist', (done) => {
      let movieID = '5feb4f0ea8a8b720ef0d8000'
      chai.request(server)
        .post(`/watchlist/${movieID}/create`)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .end((err, res) => {
          res.should.have.status(200); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('status'); // Body Response should have 'status' property
          res.body.should.have.property('data'); // Body Response should have 'data' property
          res.body.data.should.be.a('object'); // Body Response .data should be an array
          watchlist_id = res.body.data._id
          done()
        })
    })
    it('it should be an error, because movie already added to watchlist', (done) => {
      let movieID = '5feb4f0ea8a8b720ef0d8000'
      chai.request(server)
        .post(`/watchlist/${movieID}/create`)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .end((err, res) => {
          res.should.have.status(422); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors');
          done()
        })
    })
  })

  /*
   * Test the /GET route
   */
  describe('/GET watchlist', () => {
    it('it should GET all the watchlist by user', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/watchlist')
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .end((err, res) => {
          res.should.have.status(200); // Response should have status 200
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('status'); // Body Response should have 'status' property
          res.body.should.have.property('data'); // Body Response should have 'data' property
          res.body.data.should.be.an('array'); // Body Response .data should be an array
          done();
        });
    });
    it('it should be unauthorized, because not setting Authorization', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/watchlist')
        .end((err, res) => {
          res.should.have.status(441); // Response should have status 200
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id watchlist', () => {
    it('it should DELETE a watchlist', (done) => {
      chai.request(server)
        .delete(`/watchlist/delete/${watchlist_id}`)
        .set({
          Authorization: `Bearer ${authentication_key_visitor}`
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data').eql(null);
          done();
        });
    });
    it('it should be unauthorized, because not setting Authorization', (done) => {
      chai.request(server)
        .delete(`/watchlist/delete/${watchlist_id}`)
        .end((err, res) => {
          res.should.have.status(441);
          done();
        });
    });
  });
  // after((done) => { //Before each test we empty the database
  //   user.remove({}, (err) => {
  //     done();
  //   });
  //     review.remove({}, (err) => {
  //       done();
  //     });
  //   movie.remove({}, (err) => {
  //     done();
  //   });
  // });
});
