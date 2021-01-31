const {
    timeslot
} = require('../../models/mysql')
const {
    check,
    validationResult,
    matchedData,
    sanitize
} = require('express-validator'); //form validation & sanitize form params



  module.exports = {
    getOne: [
      check('id').custom(value => {
        if (value.length != 24 || !is_hexadecimal(value)) {
          throw new Error('ID timeSlot salah!')
        }

        return timeSlot.findOne({
          _id: value
        }).then(result => {
          if (!result) {
            throw new Error('ID timeSlot tidak ada!')
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
      }
    ],

    create: [
        //Set form validation rule
        check('timeslot').isString(),
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
        //Set form validation rule
        check('id').custom(value => {
            return timeSlot.findById(value).then(b => {
              if (!b) {
                throw new Error('ID timeslot tidak ada!');
              }
            })
          }),
        check('timeslot').isString(),
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
};
