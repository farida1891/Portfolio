const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const PlayerSchema = new mongoose.Schema({
  field: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  player_name: {
    type: String,
    required: true
  },
  player_number: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})


PlayerSchema.set('toJSON', {
  getters: true
})

PlayerSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

module.exports = player = mongoose.model('player', PlayerSchema, 'player');
