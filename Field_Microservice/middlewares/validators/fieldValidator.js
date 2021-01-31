const {
  field
} = require('../../models')
const {
  check,
  validationResult,
  matchedData,
  sanitize
} = require('express-validator'); //form validation & sanitize form params

const multer = require('multer'); //multipar form-data
const path = require('path'); // to detect path of directory
const crypto = require('crypto'); // to encrypt something
const fs = require('fs'); // to encrypt something
const sharp = require("sharp");

function noSpace(str) {
  var sentence = str.toLowerCase().split(" ")
  return sentence.join("-")
}

const uploadDir = '/images/'; // make images upload to /img/
const storage = multer.diskStorage({
  destination: `./public` + uploadDir,
  filename: async function(req, file, cb) {
    const data = await field.findOne({
      _id: req.params.id
    })
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err)

      if (req.body.fieldName !== undefined) {
        const field_name = noSpace(req.body.fieldName)
        cb(null, `${field_name}-${raw.toString('hex') }${path.extname(file.originalname)}`) // encrypt filename and save it into the /public/img/ directory
      } else {
        const field_name = noSpace(data.fieldName)
        cb(null, `${field_name}-${raw.toString('hex') }${path.extname(file.originalname)}`)
      }
    })
  }
})

const upload = multer({
  storage: storage,
  dest: uploadDir
});

module.exports = {
  getAll: [
    check('field').custom((value, {
      req
    }) => {
      const {
        city,
        fieldname
      } = req.query
      if (city === undefined && fieldname === undefined) {
        return field.find({}).then(result => {
          if (result.length == 0) {
            throw new Error('there are no fields')
          }
        })
      } else if (fieldname === undefined) {
        return field.find({
          city: {
            $regex: '.*' + city + '.*'
          }
        }).then(result => {
          if (result.length == 0) {
            throw new Error('there is no field available in ' + city)
          }
        })
      } else if (city === undefined) {
        return field.find({
          fieldName: {
            $regex: '.*' + fieldname + '.*'
          }
        }).then(result => {
          if (result.length == 0) {
            throw new Error('there are no fields')
          }
        })
      } else {
        return field.find({
          $and: [{
              fieldName: {
                $regex: '.*' + fieldname + '.*'
              }
            },
            {
              city: {
                $regex: '.*' + city + '.*'
              }
            }
          ]
        }).then(result => {
          if (result.length == 0) {
            throw new Error('there are no fields')
          }
        })
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
  getOne: [
    check('id').custom(value => {
      return field.findOne({
        _id: value
      }).then(result => {
        if (!result) {
          throw new Error('field\'s ID doesn\'t exist!')
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
  // getByLocation: [
  //   check('location').custom((value, {
  //     req
  //   }) => {
  //     return field.findOne({
  //       location: {
  //         $regex: '.*' + req.params.location + '.*'
  //       }
  //     }).then(result => {
  //       if (!result) {
  //         throw new Error(`there are no fields at ${req.params.location}`)
  //       }
  //     })
  //   }),
  //   (req, res, next) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(422).json({
  //         errors: errors.mapped()
  //       });
  //     }
  //     next();
  //   },
  // ],
  create: [
    upload.array('image'),
    check('image').custom((value, {
      req
    }) => {
      if (req.files.length <= 0) {
        return false
      } else {
        return true
      }
    }).withMessage('you must select at least 1 image.'),
    check('image').custom((value, {
      req
    }) => {
      if (req.files.length < 4) {
        return false
      } else {
        return true
      }
    }).withMessage('you must select min. 4 images.'),
    // check('image').custom((value, {
    //   req
    // }) => {
    //   if (req.files.length > 5) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }).withMessage('too many files to upload! the maximum upload is only 5 files'),
    check('image').custom((value, {
      req
    }) => {
      for (var i = 0; i < req.files.length; i++) {
        if (req.files.map(file => file.size)[i] > 5 * 1024 * 1024) {
          return false
        } else {
          return true
        }
      }
    }).withMessage('file size max 5 MB'),
    check('image').custom((value, {
      req
    }) => {
      for (var i = 0; i < req.files.length; i++) {
        if (req.files.map(file => file.mimetype)[i].startsWith('image')) {
          return true
        } else {
          return false
        }
      }
    }).withMessage('file upload must be image'),
    check('fieldName').isString().custom(value => {
      return field.findOne({
        fieldName: value
      }).then(b => {
        if (b) {
          throw new Error('field\'s name already exist!')
        }
      })
    }),
    check('city').isString().notEmpty(),
    check('location').isString().notEmpty(),
    check('price').isNumeric().notEmpty(),
    check('description').isString().notEmpty(),
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
    upload.array('image'),
    check('id').custom(value => {
      return field.findOne({
        _id: value
      }).then(b => {
        if (!b) {
          throw new Error('field\'s ID not exist!');
        }
      })
    }),
    check('image').custom((value, {
      req
    }) => {
      if (req.files.length !== 0) {
        if (req.files.length < 4) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }).withMessage('you must select min. 4 images.'),
    check('image').custom((value, {
      req
    }) => {
      if (req.files.length !== 0) {
        for (var i = 0; i < req.files.length; i++) {
          if (req.files.map(file => file.size)[i] > 5 * 1024 * 1024) {
            return false
          } else {
            return true
          }
        }
      } else {
        return true
      }
    }).withMessage('file size max 5 MB'),
    check('image').custom((value, {
      req
    }) => {
      if (req.files.length !== 0) {
        for (var i = 0; i < req.files.length; i++) {
          if (req.files.map(file => file.mimetype)[i].startsWith('image')) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    }).withMessage('file upload must be image'),
    check('fieldName').custom(value => {
      return field.findOne({
        fieldName: value
      }).then(result => {
        if (result) {
          throw new Error('field\'s name already exists')
        }
      })
    }),
    // check('image').custom((value, {
    //   req
    // }) => {
    //   return field.findOne({
    //     _id: req.params.id
    //   }).then(result => {
    //     if (req.files.length !== 0) {
    //       if (result.image.length + req.files.length >= 5) {
    //         throw new Error('too many files')
    //       } else {
    //         return true
    //       }
    //     }
    //   })
    // }),
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
      return field.findOne({
        _id: value
      }).then(result => {
        if (!result) {
          throw new Error('field\'s ID not exist!')
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
