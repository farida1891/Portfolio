const {
user
} = require('../models/') // import user models
const passport = require('passport'); // import passport
const jwt = require('jsonwebtoken'); // import jsonwebtoken
const {
  ObjectId
} = require('mongodb') // Import ObjectId from mongodb
const bcrypt = require('bcrypt')

class UserController {

  async getAll(req, res) {
    user.find({},
      '_id email fullname description phone profilePic').then(result => {
      res.json({
        status: 'success',
        data: result
      })
    })
  }

  async getOne(req, res) {
    user.findOne({
      _id: req.user._id
    }, '_id email fullname description phone profilePic').then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }


  // if user signup
  async signup(req, res) {
    // get the req.user from passport authentication
    const body = {
      email: req.user.email,
      _id:req.user._id
    };

    // create jwt token from body variable
    const token = jwt.sign({
      user: body
    }, 'secret_password')

    // success to create token
    res.status(200).json({
      message: 'Sign up success!',
      token: token
    })
  }

  // if user login
  async login(req, res) {
    // get the req.user from passport authentication
    const body = {
      email: req.user.email,
      _id:req.user._id
    };

    // create jwt token from body variable
    const token = jwt.sign({
      user: body
    }, 'secret_password')

    // success to create token
    res.status(200).json({
      message: 'Login success!',
      token: token,
      data: token.user
    })
  }


  async update(req, res) {

    let newData = {}
    const data = await user.findOne({
      _id: req.user._id
    })

    if (req.body.fullname) newData.fullname = req.body.fullname
    if (req.body.description) newData.description = req.body.description
    if (req.body.phone) newData.phone = req.body.phone
    if (req.body.price) newData.price = req.body.price
    if (req.body.description) newData.description = req.body.description
    if (req.file)newData.profilePic = req.file===undefined ?"profile-picture.jpg":req.file.filename
    console.log(req.file);
    user.findOneAndUpdate({
      _id: req.user._id
    }, {
      $set: newData
    }, {
      new: true
    }).then(() => {
      return user.findOne({
        _id: req.user._id
      },'id email fullname description phone profilePic' )
    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }
 

  

  async delete(req, res) {
    user.delete({
      _id: req.params.id
    }).then(() => {
      res.json({
        status: "success",
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



module.exports = new UserController; // export UserController
