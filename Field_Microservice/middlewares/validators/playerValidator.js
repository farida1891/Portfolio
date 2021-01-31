const {
  player
} = require('../../models')
const {
  check,
  validationResult,
  matchedData,
  sanitize
} = require('express-validator'); //form validation & sanitize form params


// console.log(upload);
module.exports = {
  getAll: [
    check('player').custom(async (value, {
      req
    }) => {
      const data = await field.findOne({
        _id: req.params.id
      })

      return player.find({
        field: data.fieldName
      }).then(result => {
        if (result.length == 0) {
          throw new Error('there are no players yet')
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
