const {
  review,
  field
} = require('../models');


class ReviewController {
  async getByField(req, res) {
    const data = await field.findOne({
      _id : req.params.id
    })

    review.find({
      field: data.fieldName
    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }

  async create(req, res) {
    const data = await field.findOne({
      _id: req.params.id
    })

    review.create({
      // booking: req.params.id_booking,
      user: req.body.user,
      field: data.fieldName,
      review: req.body.review,
      feedback: req.body.feedback
    }).then(result => {
      res.json({
        status: "success",
        data: result
      })
    })
  }

  // async update(req, res) {
  //   let newData = {}
  //
  //   if (req.body.review) newData.review = req.body.review
  //   if (req.body.rating) newData.rating = req.body.rating
  //
  //   review.findOneAndUpdate({
  //     _id: req.params.id
  //   }, {
  //     $set: newData
  //   }, {
  //     new: true
  //   }).then(() => {
  //     return review.findOne({
  //       _id: req.params.id
  //     })
  //   }).then(result => {
  //     res.json({
  //       status: "success",
  //       data: result
  //     })
  //   })
  // }
  //
  // async delete(req, res) {
  //   review.delete({
  //     _id: req.params.id
  //   }).then(() => {
  //     res.json({
  //       status: "success",
  //       data: null
  //     })
  //   })
  // }

}

module.exports = new ReviewController;
