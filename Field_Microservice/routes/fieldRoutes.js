const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // Import auth
const passport = require('passport'); // import passport
const FieldValidator = require('../middlewares/validators/fieldValidator');
const FieldController = require('../controllers/fieldController');
const PlayerValidator = require('../middlewares/validators/playerValidator');
const PlayerController = require('../controllers/playerController');
// const ReviewValidator = require('../middlewares/validators/reviewValidator');
// const ReviewController = require('../controllers/reviewController');


router.get('/', FieldValidator.getAll, FieldController.getAll)
router.get('/:id', FieldValidator.getOne, FieldController.getOne)
router.post('/create', [passport.authenticate('manager', { session: false }), FieldValidator.create], FieldController.create)
router.put('/update/:id', [passport.authenticate('manager', { session: false }), FieldValidator.update], FieldController.update)
router.delete('/delete/:id', [passport.authenticate('manager', { session: false }), FieldValidator.delete], FieldController.delete)

// router.get('/:id/player', PlayerValidator.getAll, PlayerController.getAll)

// router.get('/:id/review', ReviewValidator.getAll, ReviewController.getAll)


module.exports = router;
