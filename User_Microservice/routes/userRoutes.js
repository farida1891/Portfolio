const express = require('express'); // import express
const router = express.Router(); // import router
const passport = require('passport'); // import passport
const auth = require('../middlewares/auth/index'); // import passport auth strategy
const UserController = require('../controllers/userController'); // import userController
const userValidator = require('../middlewares/validators/userValidator'); // import userValidator

// if user go to localhost:3000/signup
router.get('/user', UserController.getAll);
router.get('/user/profile', [ passport.authenticate('user', {
  session: false
})], UserController.getOne);
//router.get('/:username') ambil profile pic sama username
router.post('/signup', [userValidator.signup, passport.authenticate('signup', {
  session: false
})], UserController.signup);
router.post('/login', [userValidator.login, passport.authenticate('login', {
  session: false
})], UserController.login);
router.put('/user/edit', [passport.authenticate('user', {
  session: false
})], UserController.update);
// router.post('/user/:title/:username/wl', UserController.watchlist);
router.delete('/user/delete/:id', [passport.authenticate('superUser', {
  session: false
})], userValidator.delete, UserController.delete)

//router.put('/edit', userValidator.update, UserController.update)

module.exports = router; // export router
