const {
  player
} = require('../models')

class PlayerController {

  async getAll(req, res) {
    const data = await field.findOne({
      _id: req.params.id
    })
    
    player.find({
      field: data.fieldName
    }, 'player_name player_number position team').then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }

}

module.exports = new PlayerController
