const {
  review,
  field,
  user
} = require('../../models')
const {
  check,
  validationResult,
  matchedData,
  sanitize
} = require('express-validator'); //form validation & sanitize form params


module.exports = {
  getByField: [
    check('field').custom(value => {
      return review.find({
        movie: {
          $regex: '.*' + value + '.*'
        }
      }).then(result => {
        if (result.length == 0) {
          throw new Error('movie review does not exist!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ],
  create: [
    // check('username').custom(async (value, {
    //   req
    // }) => {
    //   const userReview = await review.find({
    //     username: req.user.username
    //   })
    //   const movies = await movie.find({
    //     _id: req.params.id
    //   })
    //   for (var i = 0; i < userReview.length; i++) {
    //     if (userReview[i].movie == movies[0].title) {
    //       throw new Error(`User ${req.user.username} cannot add more review`)
    //     }
    //   }
    // }),
    check('feedback').custom(value => {
      userRating = parseInt(value)
      if (userRating < 0 && userRating > 10) {
        throw new Error('rating must be from 0 to 10')
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ],
  update: [
    check('id').custom(value => {
      return review.findOne({
        _id: value
      }).then(b => {
        if (!b) {
          throw new Error('review\'s id does not exist');
        }
      })
    }),
    check('id').custom((value, {
      req
    }) => {
      return review.findOne({
        _id: value
      }).then(b => {
        if (b.username !== req.user.username) {
          throw new Error('you dont have access to update this review!');
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ],
  delete: [
    check('id').custom(value => {
      return review.findOne({
        _id: value
      }).then(result => {
        if (!result) {
          throw new Error('review\'s ID doesnt exist!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ]
}
