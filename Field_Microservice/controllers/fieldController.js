const {
  field
} = require('../models')

class FieldController {

    async getAll(req, res) {
    const count = await field.countDocuments();
    const {
      city,
      fieldname,
      sortByField,
      sortByPrice
    } = req.query
    if (sortByField !== undefined) {
      if (city === undefined && fieldname === undefined) {
        field.find({}).sort({
          fieldName: sortByField
        }).then(result => {
          res.json({
            status: "Success",
            data: result,
            totalData: count
          })
        })
      } else if (fieldname === undefined) {
        field.find({
          city: {
            $regex: '.*' + city + '.*'
          }
        }).sort({
          fieldName: sortByField
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      } else if (city === undefined) {
        field.find({
          fieldName: {
            $regex: '.*' + fieldname + '.*'
          }
        }).sort({
          fieldName: sortByField
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      } else {
        field.find({
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
        }).sort({
          fieldName: sortByField
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      }
    } else {
      if (city === undefined && fieldname === undefined) {
        field.find({}).sort({
          price: sortByPrice
        }).then(result => {
          res.json({
            status: "Success",
            data: result,
            totalData: count
          })
        })
      } else if (fieldname === undefined) {
        field.find({
          city: {
            $regex: '.*' + city + '.*'
          }
        }).sort({
          price: sortByPrice
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      } else if (city === undefined) {
        field.find({
          fieldName: {
            $regex: '.*' + fieldname + '.*'
          }
        }).sort({
          price: sortByPrice
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      } else {
        field.find({
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
        }).sort({
          price: sortByPrice
        }).then(result => {
          var total = result.length
          res.json({
            status: "Success",
            data: result,
            totalData: total
          })
        })
      }
    }
  }

  async getOne(req, res) {
    field.findOne({
      _id: req.params.id
    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }

  // async getByLocation(req, res) {
  //   field.find({
  //     location: {
  //       $regex: '.*' + req.params.location + '.*'
  //     }
  //   }).then(result => {
  //     res.json({
  //       status: "Success",
  //       data: result
  //     })
  //   })
  // }

  async create(req, res) {
    field.create({
      fieldName: req.body.fieldName,
      city: req.body.city,
      location: req.body.location,
      price: req.body.price,
      description: req.body.description,
      image: req.files.map(file => file.filename)
    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }

  async update(req, res) {

    let newData = {}
    const data = await field.findOne({
      _id: req.params.id
    })
    console.log(req.files.length)
    if (req.body.fieldName) newData.fieldName = req.body.fieldName
    if (req.body.city) newData.city = req.body.city
    if (req.body.location) newData.location = req.body.location
    if (req.body.price) newData.price = req.body.price
    if (req.body.description) newData.description = req.body.description
    if (req.files) newData.image = req.files.length === 0 ? data.image : req.files.map(file => file.filename)

    field.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: newData
    }, {
      new: true
    }).then(() => {
      return field.findOne({
        _id: req.params.id
      })
    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }

  async delete(req, res) {
    field.delete({
      _id: req.params.id
    }).then(() => {
      res.json({
        status: "Success",
        data: null
      })
    })
  }

  async authorization(user, req, res) {
    try {
      // If success, it will be return the user information (id, email, and role)
      return res.status(200).json({
        status: "Success!",
        message: "Authorized!",
        user: user
      })
    } catch (e) {
      // If error, it will return the message of error
      return res.status(401).json({
        status: "Error!",
        message: "Unauthorized!",
      })
    }
  }

}

module.exports = new FieldController
