const {
  check,
  validationResult,
  matchedData,
  sanitize
} = require('express-validator'); //form validation & sanitize form params

const multer = require('multer'); //multipar form-data
const path = require('path'); // to detect path of directory
const crypto = require('crypto'); // to encrypt something

const uploadDir = '/user/'; // make images upload to /img/
const storage = multer.diskStorage({
  destination: './public' + uploadDir, // make images upload to /public/img/
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname)) // encrypt filename and save it into the /public/img/ directory
    })
  }
})

const upload = multer({
  storage: storage,
  dest: uploadDir
});

module.exports = {

  signup: [

    check('email').custom(value => {
      return user.findOne({
        email: value
      }).then(result => {
        if (result) {
          throw new Error('email already exist!')
        }
      })
    }),
    check('email', 'email field must be email address').normalizeEmail().isEmail(),
    check('password', 'password field must have 8 to 32 characters').isString().isLength({
      min: 8,
      max: 32
    }),
    check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
    .exists()
    .custom((value, {
      req
    }) => value === req.body.password),
    //check('role').isString(),
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
  login: [
    check('email', 'email field must be email address').normalizeEmail().isEmail(),
    check('password', 'password field must have 8 to 32 characters').isString().isLength({
      min: 8,
      max: 32
    }),
    check('email').custom(value => {
      return user.findOne({
        email: value
      }).then(result => {
        if (!result) {
          throw new Error('email is not found!')
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
  update: [
    upload.single('profilePic'),

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
  delete: [
    check('id').custom(value => {
      return user.findOne({
        _id: value
      }).then(result => {
        if (!result) {
          throw new Error('user does not exist!')
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
};
