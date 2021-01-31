const {
    timeslot
} = require('../models/mysql')

class TimeSlotController {

    async getAll(req, res) {
        timeslot.findAll({}).then(result => {
            res.json({
                status: "success",
                data: result
            })
        });
    }

    async getOne(req, res) {
        timeslot.findOne({
            _id: req.params.id
        }).then(result => {
            res.json({
                status: "success",
                data: result
            })
        })
    }

    async create(req, res) {

        timeslot.create({
            timeslot: req.body.timeslot,
        }).then(result => {
            res.json({
                status: "success",
                result: result
            })
        })
    }

    async update(req, res) {

        timeslot.findOneAndUpdate({
            _id: req.params.id
          }, {
            timeSlot: req.body.timeSlot
          }).then(result => {
            res.json({
              status: 'success',
              data: result
            })
          })
    }
}

module.exports = new TimeSlotController;
