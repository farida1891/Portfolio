const express = require('express');
const router = express.Router();
const passport = require('passport'); // import passport
const ReviewValidator = require('../middlewares/validators/reviewValidator');
const ReviewController = require('../controllers/reviewController');

router.get('/:id', ReviewController.getByField)
router.post('/:id/create', ReviewController.create)


module.exports = router;
